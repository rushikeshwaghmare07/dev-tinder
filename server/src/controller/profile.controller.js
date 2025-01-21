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

module.exports = {
  getUserProfile,
};
