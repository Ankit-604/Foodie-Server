const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewsSchema);

module.exports = Review;
