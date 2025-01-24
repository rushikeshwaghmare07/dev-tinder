const ConnectionRequest = require("../models/connectionRequest.model.js");
const User = require("../models/user.model.js");

const getReceivedConnectionRequests = async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find connection requests sent to the logged-in user
    const user = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
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
      message:
        error?.message ||
        "Failed to fetch connection requests. Please try again later.",
    });
  }
};

const getConnections = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionData = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate({
      path: "fromUserId",
      select: "firstName lastName profileUrl age gender about skills",
    });

    const data = connectionData.map((row) => row.fromUserId);

    return res.status(200).json({
      success: true,
      data: data,
      message: "All connection fetched successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Failed to fetch connections. please try again later.",
    });
  }
};

const feed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getReceivedConnectionRequests,
  getConnections,
  feed,
};
