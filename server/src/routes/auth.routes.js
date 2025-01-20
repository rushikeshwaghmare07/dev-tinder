const express = require("express");
const { userSignup } = require("../controller/auth.controller.js");

const route = express.Router();

route.post("/signup", userSignup);

module.exports = route;
