const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  cardId: {
    type: Number,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  }
});

module.exports = Card = mongoose.model("card", cardSchema);
