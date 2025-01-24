const express = require("express");
const { userAuth } = require("../middleware/auth.middleware");
const { getReceivedConnectionRequests, getConnections, feed } = require("../controller/user.controller");

const router = express.Router();

router.get("/connections/requests/received", userAuth, getReceivedConnectionRequests);
router.get("/connections/show", userAuth, getConnections);
router.get("/feed", userAuth, feed);

module.exports = router;