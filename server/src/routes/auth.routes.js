const express = require("express");
const { userSignup, userLogin } = require("../controller/auth.controller.js");

const route = express.Router();

route.post("/signup", userSignup);
route.post("/login", userLogin);

module.exports = route;
