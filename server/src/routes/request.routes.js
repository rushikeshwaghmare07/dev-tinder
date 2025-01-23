const express = require("express");
const { userAuth } = require("../middleware/auth.middleware.js");
const { sendConnectionRequest, updateConnectionRequestStatus } = require("../controller/request.controller.js");

const router = express.Router();

// Send connection request
router.post("/send/:status/:toUserId", userAuth, sendConnectionRequest);

// Review connection request
router.patch("/review/:status/:requestId", userAuth, updateConnectionRequestStatus);

module.exports = router;
