const mongoose = require("mongoose");

const schema = mongoose.Schema({
  sku: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    min: [1, "Invalid quantity"],
  },
  name: {
    type: String,
  },
  sale_price: {
    type: Number,
    default: 0,
    min: [0, "Invalid price amount"],
  },
  image_url: {
    type: String,
  },
});

schema.virtual("amount").get(function () {
  return this.qty * this.sale_price;
});

module.exports = mongoose.model("Line", schema);
