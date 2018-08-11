const config = require('config');
const cloudFrontHostname = config.get('cloudFrontHostname');
const jsonParser = require('body-parser').json();
const multer = require('multer')({ dest: 'uploads/' });
const ShopifyAPIClient = require('shopify-api-node');
const { s3PutObject } = require('../lib/s3');
const Product = require('../models/Product');
const router = require('express').Router();

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUM = 0;

const getProductPage = (shop, page, limit) => {
  limit = limit ? parseInt(limit) : DEFAULT_PAGE_SIZE;
  page = page ? parseInt(page) : DEFAULT_PAGE_NUM;

  return Product.find({ shop })
  .sort({ title: 1 }) // sort alphabetically
  .skip(page * limit)
  .limit(limit + 1)
  .then(result => {
    const hasNextPage = result.length > limit;
    return {
      products: hasNextPage ? result.slice(0, result.length - 1) : result,
      hasNextPage
    }
  })
};

// called when products are selected via product picker modal
router.post('/', jsonParser, async (request, response, next) => {
  try {
    const {
      session: { shop, accessToken },
      body: { products },
      query: { limit, page }
    } = request;
    // const shopify = new ShopifyAPIClient({ shopName: shop, accessToken: accessToken });
    const insertProducts = products.map(({ id, title }) => ({ id, title, shop }))
    await Product.insertMany(insertProducts);

    const updatedProducts = await getProductPage(shop, page, limit);
    return response.json(updatedProducts);
  }
  catch (err) {
    console.error('catching error', err);
    return next(err); // TODO: is this correct error-handling behavior?
  }
});

router.get('/', async (request, response, next) => {
  try {
    let {
      session: { shop },
      query: { limit, page }
    } = request;

    const products = await getProductPage(shop, page, limit);

    return response.json(products);
  } catch (err) {
    return next(err);
  }
});

router.delete('/:productId', async (request, response, next) => {
  try {
    const {
      session: { shop },
      params : { productId },
      query: { limit, page }
    } = request;

    const deletedProduct = await Product.deleteOne({ id: productId });
    console.log(deletedProduct);

    const products = await getProductPage(shop, page, limit);

    return response.json(products);
  } catch (err) {
    return next(err);
  }
});

router.patch('/:productId', multer.single('image'), async (request, response, next) => {
  try {
    const {
      session: { shop, accessToken },
      params: { productId },
      body: { height, width },
      file
    } = request;
    // TODO: shopify call limits
    let image;
    if (file) {
      const s3ObjectName = `${shop}/${productId}`;
      await s3PutObject(s3ObjectName, file);
      image = `${cloudFrontHostname}/${s3ObjectName}`;
    }

    const query = { id: productId },
      update = { height, width, image },
      opts = { new: true };

    const updated = await Product.findOneAndUpdate(query, update, opts);
    
    return await response.json(updated);
  } catch (err) {
    console.log('err caught in patch ', err);
    return next(err);
  }
});

module.exports = router;