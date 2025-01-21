const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized.",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new Error("Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error?.message || "Invalid token",
    });
  }
};

module.exports = {
  userAuth,
};
