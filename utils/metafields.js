const { METAFIELD_NS } = require('./constants');

const hasMetafield = key => m => m.namespace === METAFIELD_NS && m.key === key;

module.exports.resolveMetafield = (metafields, key, defaultVal) => {
  const targetMetafield = metafields.find(hasMetafield(key));
  return targetMetafield ? targetMetafield.value : defaultVal;
};