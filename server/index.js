const {
  SHOPIFY_APP_KEY,
  SHOPIFY_APP_SECRET,
  NODE_ENV,
  HEROKU_APP_NAME,
  REDIS_URL,
  MONGO_CONNECTION_STR
} = process.env;

const config = require('config');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const logger = require('morgan');
const ShopifyExpress = require('@shopify/shopify-express');
const { MemoryStrategy, RedisStrategy } = require('@shopify/shopify-express/strategies');
const SHOPIFY_APP_HOST = require('../utils/env').getAppHostname(HEROKU_APP_NAME, config.get('appName'));
const isDevelopment = require('../utils/env').isDevEnvironment(NODE_ENV);
const productRoutes = require('./routes/product');
const mongoose = require('mongoose');
// for server-side rendering...
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const App = require('../client/components/App');
const rootReducer = require('../client/reducers');
const { getProductPage } = require('./lib/mongo-query');

mongoose.connect(MONGO_CONNECTION_STR, {
  useNewUrlParser: true,
  // autoIndex: false
});

const shopifyConfig = {
  host: SHOPIFY_APP_HOST,
  apiKey: SHOPIFY_APP_KEY,
  secret: SHOPIFY_APP_SECRET,
  scope: ['write_orders, write_products'],
  shopStore: isDevelopment ? new MemoryStrategy() : new RedisStrategy(REDIS_URL),
  afterAuth(request, response) {
    return response.redirect('/');
  },
};

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
const { routes, middleware } = shopify;
const { withShop } = middleware;

app.use('/shopify', routes);

// Client
// app.get('/', withShop({authBaseUrl: '/shopify'}), function(request, response) {
//   const { session: { shop, accessToken } } = request;
//   response.render('app', {
//     title: 'Shopify Node App',
//     apiKey: shopifyConfig.apiKey,
//     shop: shop,
//   });
// });

app.get('/', withShop({authBaseUrl: '/shopify'}), async (request, response) => {
  // only purpose of this store is to provide initial app state
  const { session: { shop } } = request;
  const preloadedState = await getProductPage(shop, 0, 50);
  const store = createStore(rootReducer, preloadedState);

  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // sanitize state to prevent script injection
  const sanitizedPreloadedState =
    JSON.stringify(preloadedState).replace(/</g, '\\u003c');

  response.render('app', {
    title: 'Shopify Node App',
    apiKey: shopifyConfig.apiKey,
    shop: shop,
    preloadedState: sanitizedPreloadedState,
    html
  });
});

app.use('/api/products', productRoutes);

// Error Handlers
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (error, request, response, next) {
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
