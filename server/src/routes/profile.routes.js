const express = require("express");
const { userAuth } = require("../middleware/auth.middleware.js");
const { getUserProfile } = require("../controller/profile.controller.js");

const router = express.Router();

router.get("/view", userAuth, getUserProfile);

module.exports = router;
