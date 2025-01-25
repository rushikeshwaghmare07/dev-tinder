const ConnectionRequest = require("../models/connectionRequest.model.js");
const User = require("../models/user.model.js");

const getReceivedConnectionRequests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find connection requests sent to the logged-in user
    const requests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate({
      path: "fromUserId",
      select: "firstName lastName profileUrl age gender about skills",
    });

    if (!requests || requests.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No connection requests found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: requests,
      message: "Connection requests retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "An error occurred while fetching connection requests. Please try again later.",
    });
  }
};

const getConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate({
      path: "fromUserId",
      select: "firstName lastName profileUrl age gender about skills",
    });

    if (!connections || connections.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No connections found.",
      });
    }

    const connectionData = connections.map(
      (connection) => connection.fromUserId
    );

    return res.status(200).json({
      success: true,
      data: connectionData,
      message: "Connections retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "An error occurred while fetching connections. Please try again later.",
    });
  }
};

const feed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find all connection requests involving the logged-in user
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    // Collect user IDs to hide from the feed
    const hideUsersFromFeed = new Set([
      ...connectionRequests.map((req) => req.fromUserId.toString()),
      ...connectionRequests.map((req) => req.toUserId.toString()),
      loggedInUser._id.toString(),
    ]);

    // Fetch users not connected to the logged-in user
    const users = await User.find({
      _id: { $nin: Array.from(hideUsersFromFeed) },
    }).select("firstName lastName profileUrl age gender about skills");

    if (!users || users.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No users available for your feed.",
      });
    }

    return res.status(200).json({ 
      success: true,
      data: users,
      message: "Feed retrieved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "An error occurred while fetching the feed. Please try again later.",
    });
  }
};

module.exports = {
  getReceivedConnectionRequests,
  getConnections,
  feed,
};
