const express = require("express");
require("dotenv").config();
const connectDb = require("./src/config/database");
const userRouter = require("./src/router/userRouter");
const imageRouter = require("./src/router/imageRouter");
const cors = require("cors");
const cardRouter = require("./src/router/foodCardRouter");
const reviewRouter = require("./src/router/reviewRouter");
const cartRouter = require("./src/router/cartRouter");
const checkoutRouter = require("./src/router/checkoutRouter");
const addressRouter = require("./src/router/addressRouter");
const debitCardRouter = require("./src/router/debitCardRouter");
const app = express();
// const corsOptions = {
//   origin: [process.env.LOCAL_FRONTEND_URL, process.env.FRONTEND_URL],
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };

// app.use(cors(corsOptions));

app.use(
  cors({
    origin: "https://foodie-client-three.vercel.app/login", // Allow requests from this origin
  })
);

const PORT = process.env.PORT || 7000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(
    "Hello Viewer, this is a server part of project - Food Delivery App"
  );
});

app.use("/api/", userRouter);
app.use("/api/", imageRouter);
app.use("/api/", cardRouter);
app.use("/api/", reviewRouter);
app.use("/api/", cartRouter);
app.use("/api/", checkoutRouter);
app.use("/api/", addressRouter);
app.use("/api/", debitCardRouter);

connectDb()
  .then(() => {
    console.log("Successfully connected to MongoDB...");
    app.listen(PORT, () => {
      console.log(`Server is live at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB: " + err);
  });
