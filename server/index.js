// TODO: improve directory structure of express app
require('isomorphic-fetch');
require('dotenv').config();
const { AR_PRODUCT_TAG, METAFIELD_NS } = require('../utils/constants');
const { resolveMetafield } = require('../utils/metafields');
const config = require('config');
const { SHOPIFY_APP_KEY, SHOPIFY_APP_SECRET, NODE_ENV, HEROKU_APP_NAME, REDIS_URL } = process.env;

const express = require('express');
const jsonParser = require('body-parser').json();
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const logger = require('morgan');

const ShopifyAPIClient = require('shopify-api-node');
const ShopifyExpress = require('@shopify/shopify-express');
const { MemoryStrategy, RedisStrategy } = require('@shopify/shopify-express/strategies');
const SHOPIFY_APP_HOST = require('../utils/env').getAppHostname(HEROKU_APP_NAME, config.get('appName'));
const isDevelopment = require('../utils/env').isDevEnvironment(NODE_ENV);

const shopifyConfig = {
  host: SHOPIFY_APP_HOST,
  apiKey: SHOPIFY_APP_KEY,
  secret: SHOPIFY_APP_SECRET,
  scope: ['write_orders, write_products'],
  shopStore: isDevelopment ? new MemoryStrategy() : new RedisStrategy(REDIS_URL),
  afterAuth(request, response) {
    const { session: { accessToken, shop } } = request;

    registerWebhook(shop, accessToken, {
      topic: 'orders/create',
      address: `${SHOPIFY_APP_HOST}/order-create`,
      format: 'json'
    });

    return response.redirect('/');
  },
};

// TODO: remove webhook example
const registerWebhook = function(shopDomain, accessToken, webhook) {
  const shopify = new ShopifyAPIClient({ shopName: shopDomain, accessToken: accessToken });
  shopify.webhook.create(webhook).then(
    response => console.log(`webhook '${webhook.topic}' created`),
    err => console.log(`Error creating webhook '${webhook.topic}'. ${JSON.stringify(err.response.body)}`)
  );
}

const app = express();
const redisOpts = {
  client: shopifyConfig.shopStore.client,
  logErrors: true
};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(
  session({
    store: isDevelopment ? undefined : new RedisStore(redisOpts),
    secret: SHOPIFY_APP_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

const staticPath = path.resolve(__dirname, '../dist');
app.use('/dist', express.static(staticPath));

// Install
app.get('/install', (req, res) => res.render('install'));

// Create shopify middlewares and router
const shopify = ShopifyExpress(shopifyConfig);

// Mount Shopify Routes
const {routes, middleware} = shopify;
const {withShop, withWebhook} = middleware;

app.use('/shopify', routes);

// Client
app.get('/', withShop({authBaseUrl: '/shopify'}), function(request, response) {
  const { session: { shop, accessToken } } = request;
  response.render('app', {
    title: 'Shopify Node App',
    apiKey: shopifyConfig.apiKey,
    shop: shop,
  });
});

const enableProductsForAR = async (shopify, products) => {
  if (!products.length) return products;
  const p = products[0];
  await shopify.product.update(p.id, {
    // TODO: ensure that when product is deleted that we REMOVE these tags that are created
    // otherwise, if customer removes and re-adds products, we will get dup tags
    // also, should actually check if image is low res before marking it as such.
    tags: p.tags.concat(`, ${AR_PRODUCT_TAG}`)
  });
  return enableProductsForAR(shopify, products.slice(1, products.length));
};

const getProductMetafieldsOne = (id, shopify) => {
  const opts = {
    metafield: {
      owner_resource: 'product',
      owner_id: id,
      namespace: METAFIELD_NS
    }
  }
  return shopify.metafield.list(opts);
}

const getProductMetafieldsAll = async (shopify, products, pos) => {
  if (pos === products.length) return products;
  const p = products[pos];
  p.metafields = await getProductMetafieldsOne(p.id, shopify); // TODO: what if reject?
  return getProductMetafieldsAll(shopify, products, pos+1);
}

// called when products are selected via product picker modal
app.post('/api/products', jsonParser, async (request, response, next) => {
  try {
    const { session: { shop, accessToken } } = request;
    // TODO: shopify call limits
    const shopify = new ShopifyAPIClient({ shopName: shop, accessToken: accessToken });
    const { products } = request.body;

    // identify products that are not already AR enabled
    const targetProducts = products.filter(p => !p.tags.includes(AR_PRODUCT_TAG));
    await enableProductsForAR(shopify, targetProducts);
    return response.json(targetProducts);
  }
  catch (err) {
    console.error('catching error', err);
    return next(err); // TODO: is this correct error-handling behavior?
  }
});

app.get('/api/products', async (request, response, next) => {
  try {
    const { session: { shop, accessToken } } = request;
    // TODO: shopify call limits
    const shopify = new ShopifyAPIClient({ shopName: shop, accessToken: accessToken });
    const products = await shopify.product.list();
    console.log('get product list...', products);
    const targetProducts = products.filter(p => p.tags.includes(AR_PRODUCT_TAG));
    const targetProductsWithMetaFields = await getProductMetafieldsAll(shopify, targetProducts, 0);
    console.log('get product list with metafields...', targetProductsWithMetaFields);
    return response.json(targetProductsWithMetaFields);
  } catch (err) {
    return next(err);
  }
});

app.delete('/api/products/:productId', async (request, response, next) => {
  try {
    const { productId } = request.params;
    const { session: { shop, accessToken } } = request;
    // TODO: shopify call limits
    const shopify = new ShopifyAPIClient({ shopName: shop, accessToken: accessToken });
    const product = await shopify.product.get(productId);
    let tags = product.tags.replace(AR_PRODUCT_TAG, '');
    await shopify.product.update(productId, { tags });
    return response.json({ id: productId });
  } catch (err) {
    return next(err);
  }
});

const upsertMetafield = (currMetafields, key, value, shopify, productId) => {
  const targetMetafield = resolveMetafield(currMetafields, key, '');
  console.log('in upsert targetMetafield', targetMetafield, key, value, productId);
  if (targetMetafield && targetMetafield.value === value) { // target metafield exists and requires no update
    return Promise.resolve(targetMetafield);
  } else if (targetMetafield) { // target metafield exists but requires update
    return shopify.metafield.update(targetMetafield.id, { value, value_type: 'string' })
  } else { // target metafield does not exist, create it
    return shopify.metafield.create({
      key,
      value,
      value_type: 'string',
      namespace: METAFIELD_NS,
      owner_resource: 'product',
      owner_id: productId
    });
  }
};

app.patch('/api/products/:productId', jsonParser, async (request, response, next) => {
  try {
    console.log('in patch....');
    const { productId } = request.params;
    const { height, width } = request.body;
    const { session: { shop, accessToken } } = request;
    // TODO: shopify call limits
    const shopify = new ShopifyAPIClient({ shopName: shop, accessToken: accessToken });
    let currMetafields = await getProductMetafieldsOne(productId, shopify);
    await Promise.all([
      upsertMetafield(currMetafields, 'height', height, shopify, productId),
      upsertMetafield(currMetafields, 'width', width, shopify, productId)
    ]);
    currMetafields = await getProductMetafieldsOne(productId, shopify); // TODO: should I skip making this call for perf?
    return await response.json(currMetafields);
  } catch (err) {
    return next(err);
  }
});

app.post('/order-create', withWebhook((error, request) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log('We got a webhook!');
  console.log('Details: ', request.webhook);
  console.log('Body:', request.body);
}));

// Error Handlers
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
