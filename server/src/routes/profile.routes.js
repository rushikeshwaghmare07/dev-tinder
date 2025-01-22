const express = require("express");
const { userAuth } = require("../middleware/auth.middleware.js");
const { getUserProfile, updateUserProfile, updatePassword } = require("../controller/profile.controller.js");

const router = express.Router();

router.get("/view", userAuth, getUserProfile);
router.patch("/edit", userAuth, updateUserProfile);
router.patch("/update-password", userAuth, updatePassword);

module.exports = router;
