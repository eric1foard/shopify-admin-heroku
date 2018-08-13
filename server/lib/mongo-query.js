const {
  IMAGE_NEEDED_FILTER,
  DIMENSIONS_NEEDED_FILTER,
  FILTER_OPTS
} = require('../../utils/constants');

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
  console.log('in resolveQury!!!!!! ',filters);
  
  let query = { shop }; // by default, query for all products in shop
  let sort = { title: 1 }; // sort alphabetically
  // if sort is null, mongo will order results by how well they match query
  let textQuery = { $text: { $search : search } };
  let filterQuery = resolveFilterQuery(filters);

  if (search && filters.length) {
    return { query: { $and: [ textQuery, filterQuery ] }, sort: null };
  }
  if (search) {
    return { query: textQuery, sort: null };
  }
  if (filters.length) {
    console.log('filter query!!!' , filterQuery)
    return { query: filterQuery, sort };
  }
  return { query, sort };
};

module.exports = {
  resolveQuery
};