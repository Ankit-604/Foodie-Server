const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    cost: {
      type: Number,
    },
    mainImage: {
      type: String,
    },
    addImageBg: {
      type: String,
    },
    addImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
