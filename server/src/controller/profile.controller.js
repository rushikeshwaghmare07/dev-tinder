const { validateUpdateProfileData, validatePassword } = require("../utils/validation.js");

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

const updatePassword = async (req, res) => {
  try {
    validatePassword(req);

    const { oldPassword, newPassword } = req.body;

    if (oldPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "New password cannot be the same as the old password.",
      });
    }

    const user = req.user;

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "The current password you entered is incorrect",
      });
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Your password has been updated successfully",
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
  updatePassword,
};
