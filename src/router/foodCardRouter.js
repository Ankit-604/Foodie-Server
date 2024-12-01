const express = require("express");
const Card = require("../models/foodCard.schema");

const cardRouter = express.Router();

cardRouter.post("/card", async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      price,
      cost,
      mainImage,
      addImageBg,
      addImage,
    } = req.body;

    const numericPrice = parseFloat(price.replace(/[^\d.-]/g, ""));
    const numericCost = parseFloat(cost.replace(/[^\d.-]/g, ""));

    const cardData = new Card({
      name,
      title,
      description,
      price: numericPrice,
      cost: numericCost,
      mainImage,
      addImageBg,
      addImage,
    });

    await cardData.save();
    return res
      .status(201)
      .json({ message: "Card successfully created", cardData });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to save card data", error: error.message });
  }
});

cardRouter.get("/card", async (req, res) => {
  try {
    const cards = await Card.find({});

    if (!cards || cards.length === 0) {
      return res.status(404).json({ message: "No cards found", status: "404" });
    }

    const formattedCards = cards.map((card) => {
      return {
        ...card.toObject(),
        price: card.price ? `₹ ${card.price}` : "Price not available",
      };
    });

    return res.status(200).json({
      message: "Cards retrieved successfully",
      cards: formattedCards,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error occurred while fetching cards",
      error: error.message,
    });
  }
});

module.exports = cardRouter;
