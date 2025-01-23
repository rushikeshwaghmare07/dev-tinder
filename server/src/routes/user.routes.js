const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const { getReceivedConnectionRequests } = require("../controller/user.controller");

const router = express.Router();

router.get("/connections/requests/received", userAuth, getReceivedConnectionRequests);

module.exports = router;