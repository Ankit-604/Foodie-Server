const express = require("express");
const Images = require("../models/images.schema");

const imageRouter = express.Router();

imageRouter.post("/image", async (req, res) => {
  try {
    const { data } = req.body;

    if (typeof data !== "object" || Array.isArray(data)) {
      return res.status(400).json({
        message:
          "Invalid data format. Please provide an object of key-value pairs.",
      });
    }

    const image = new Images({ data });

    await image.save();

    return res.status(201).json({
      message: "Image saved successfully",
      data: image,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to save image", error: error.message });
  }
});

imageRouter.get("/image", async (req, res) => {
  try {
    const images = await Images.find({});
    if (!images || images.length === 0) {
      return res
        .status(404)
        .json({ message: "No images found", status: "404" });
    }

    return res.status(200).json({
      message: "Images retrieved successfully",
      data: images,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving images", error: error.message });
  }
});

module.exports = imageRouter;
