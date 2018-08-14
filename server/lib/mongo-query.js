const Product = require('../models/Product');
const {
  IMAGE_NEEDED_FILTER,
  DIMENSIONS_NEEDED_FILTER,
  FILTER_OPTS
} = require('../../utils/constants');

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_PAGE_NUM = 0;

const resolveFilterQueryImage = filters => {
  let imageFilter = filters.find(f => f.key === IMAGE_NEEDED_FILTER);
  if (!imageFilter) return null;
  // NOTE: this will be incorrect if image is empty string, but that should never happen
  return { image: { $exists: imageFilter.value === FILTER_OPTS.PRESENT } };
};

const resolveFilterQueryDimensions = filters => {
  let dimensionFilter = filters.find(f => f.key === DIMENSIONS_NEEDED_FILTER);
  if (!dimensionFilter) return null;

  return dimensionFilter.value === FILTER_OPTS.PRESENT ?
  { $and: [ { height: { $exists: true } }, { width: { $exists: true } } ] } :
  { $or: [ { height: { $exists: false } }, { width: { $exists: false } } ] };
};

const resolveFilterQuery = filters => {
  const filterQueryImage = resolveFilterQueryImage(filters);
  const filterQueryDimensions = resolveFilterQueryDimensions(filters);
  
  if (filterQueryImage && filterQueryDimensions) {
    return { $and: [filterQueryImage, filterQueryDimensions] };
  } 
  return filterQueryImage || filterQueryDimensions;
}

const resolveQuery = (shop, search, filters) => {
  let textQuery = { $text: { $search : search } };
  let filterQuery = resolveFilterQuery(filters);

  if (search && filters.length) {
    return {
      query: { $and: [ { shop }, textQuery, filterQuery ] },
      sort: null // if sort is null, mongo orders results by query match strength
    };
  } 
  if (search) {
    return {
      query: { $and: [ { shop }, textQuery ] },
      sort: null
    };
  }
  if (filters.length) {
    return {
      query: { $and: [ { shop }, filterQuery ] },
      sort: { title: 1 }
    };
  }
  return {
    query: { shop }, // by default, query for all products in shop
    sort: { title: 1 } // sort alphabetically
  };
};

const getProductPage = (shop, page, limit, search = '', filters = []) => {
  limit = limit ? parseInt(limit) : DEFAULT_PAGE_SIZE;
  page = page ? parseInt(page) : DEFAULT_PAGE_NUM;
  const { query, sort } = resolveQuery(shop, search, filters.map(f => JSON.parse(f)));

  return Product
  .find(query)
  .sort(sort)
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

module.exports = {
  getProductPage
};