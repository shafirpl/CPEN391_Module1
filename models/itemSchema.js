const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({

  barcodeId:{
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },

  weight: {
      type: Number,
      required: true,
  }
});

module.exports = Item = mongoose.model("item", itemSchema);
