const { METAFIELD_NS } = require('./constants');

const hasMetafield = key => m => m.namespace === METAFIELD_NS && m.key === key;

module.exports.resolveMetafield = (metafields, key, defaultVal) =>
  metafields.find(hasMetafield(key)) || { key, value: defaultVal };