const mongoose = require("mongoose");

const schema = mongoose.Schema({
  sku: {
    type: String,
    unique: true,
    validate: [validateSku, "Invalid sku"],
  },
  name: {
    type: String,
    maxlength: [125, "Name is too long"],
    trim: true,
  },
  normalized: {
    type: String,
    maxlength: [125, "Name is too long"],
  },
  description: {
    type: String,
    maxlength: [3000, "Description is too long"],
  },
  sale_price: {
    type: Number,
    required: true,
    default: 0,
    min: [0, "Invalid price amount"],
  },
  image_url: {
    type: String,
  },
  brand: {
    type: String,
    minlength: 2,
    maxlength: [30, "Brand is too long"],
  },
});

// will return true or false
function validateSku(value) {
  return value.length == 7;
  // == comparaison
}

module.exports = mongoose.model("Item", schema);
