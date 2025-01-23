const ConnectionRequest = require("../models/connectionRequest.model.js");

const getReceivedConnectionRequests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find connection requests sent to the logged-in user
    const user = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested"
    }).populate({
      path: "fromUserId",
      select: "firstName lastName profileUrl age gender about skills",
    });

    res.status(200).json({
      success: true,
      data: user,
      message: "Connection requests retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Failed to fetch connection requests. Please try again later.",
    });
  }
};

module.exports = {
  getReceivedConnectionRequests,
};
