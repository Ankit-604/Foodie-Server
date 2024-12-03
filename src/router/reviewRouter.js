const express = require("express");
const Review = require("../models/reviews.schema");

const reviewRouter = express.Router();

reviewRouter.post("/review", async (req, res) => {
  try {
    const { name, location, description, date } = req.body;
    if (!name || !location || !description || !date) {
      return res
        .status(400)
        .json({ message: "All fields are required, please try again." });
    }

    const userReview = new Review({
      name,
      location,
      description,
      date,
    });
    await userReview.save();

    return res
      .status(201)
      .json({ message: "Review is added successfully.", data: userReview });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add review, please try again.",
      error: error.message,
    });
  }
});

reviewRouter.get("/review", async (req, res) => {
  try {
    const userReviews = await Review.find({});
    if (!userReviews || userReviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found,at the moment." });
    }

    return res.status(200).json({
      message: "Users reviews are retrieved successfully.",
      data: userReviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving reviews,from the database.",
      error: error.message,
    });
  }
});

module.exports = reviewRouter;
