const mongoose = require('mongoose');
const { Schema } = mongoose;

const mongoSchema = new Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  shop: { type: String, required: true }, // TODO: should I use shop ID instead?
  height: Number,
  width: Number,
  image: String
});

// NOTE: these should be used for DEVELOPMENT ONLY!!!
// in prod, indexes should NOT be created on the fly.
mongoSchema.index({ shop: 1 }, { unique: true });
mongoSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model('Product', mongoSchema);