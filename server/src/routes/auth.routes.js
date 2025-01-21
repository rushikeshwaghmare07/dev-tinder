const express = require("express");
const { userSignup, userLogin, userLogout } = require("../controller/auth.controller.js");
const { userAuth } = require("../middleware/auth.middleware.js");

const route = express.Router();

route.post("/signup", userSignup);
route.post("/login", userLogin);
route.post("/logout", userAuth, userLogout);

module.exports = route;
