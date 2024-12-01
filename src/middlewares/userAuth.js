const User = require("../models/user.schema");
const JWT = require("jsonwebtoken");
require("dotenv").config();

async function userAuth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization token is mandatory." });
  }

  try {
    const decodedToken = JWT.verify(token, process.env.SECRET);
    const { email } = decodedToken;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User  not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({
          error: "The provided token is invalid. Please use a valid token.",
        });
    }
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Your token has expired. Please log in again." });
    }
    return res
      .status(500)
      .json({ error: "An internal server error occurred. Please try again." });
  }
}

module.exports = userAuth;
