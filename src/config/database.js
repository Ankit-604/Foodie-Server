const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MANGO_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "FoodDeliveryApp",
    });
    console.log("Successfully established a connection to MongoDB.");
  } catch (error) {
    console.error("Unable to connect to MongoDB: " + error);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
