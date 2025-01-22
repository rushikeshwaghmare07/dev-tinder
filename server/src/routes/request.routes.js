const express = require("express");
const { userAuth } = require("../middleware/auth.middleware.js");
const { sendConnectionRequest } = require("../controller/request.controller.js");

const router = express.Router();

router.post("/send/:status/:toUserId", userAuth, sendConnectionRequest);

module.exports = router;
