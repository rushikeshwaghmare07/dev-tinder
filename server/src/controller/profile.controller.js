const { validateUpdateProfileData } = require("../utils/validation.js");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      data: user,
      message: "User profile retrieved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    if (!validateUpdateProfileData(req)) {
      return res.status(400).json({
        success: false,
        message: "Invalid edit request",
      });
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();

    return res.status(200).json({
      success: true,
      message: `${loggedInUser.firstName}, your profile is updated successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
};
