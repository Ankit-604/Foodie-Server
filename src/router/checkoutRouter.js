const express = require("express");
const Cart = require("../models/cart.schema");
const Checkout = require("../models/checkout.schema");
const userAuth = require("../middlewares/userAuth");
const mongoose = require("mongoose");

const checkoutRouter = express.Router();

checkoutRouter.post("/checkout/:cartId", userAuth, async (req, res) => {
  try {
    const { cartId } = req.params;
    const { notes } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({
        message: "Invalid Cart ID format.Please provide a valid cartId.",
      });
    }

    const cart = await Cart.findById(cartId).populate("items.cardId");
    if (!cart) {
      return res
        .status(404)
        .json({ message: "No cart found with the given ID." });
    }

    const checkout = new Checkout({
      cartId,
      userId,
      notes: notes || "",
    });

    await checkout.save();

    const totalPrice = cart.items.reduce(
      (total, item) => total + item.price,
      0
    );

    return res.status(201).json({
      message: "Checkout is created successfully.",
      checkoutId: checkout._id,
      cart: cart.items,
      notes: checkout.notes,
      totalPrice,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating checkout.", error: err.message });
  }
});

module.exports = checkoutRouter;
