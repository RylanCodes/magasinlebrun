const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    lines: { type: Array },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    gst: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    qst: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Sale", schema);
