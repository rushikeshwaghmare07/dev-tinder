const ConnectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user.model.js");

const sendConnectionRequest = async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const connectionStatus = req.params.status;

    if (!toUserId || !connectionStatus) {
      return res.status(400).json({
        success: false,
        message: "Both 'toUserId' and 'status' are required.",
      });
    }

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(connectionStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid connection status: ${connectionStatus}`,
      });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({
        success: false,
        message: "The user you are trying to connect with does not exist.",
      });
    }

    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingConnectionRequest) {
      return res.status(400).json({
        success: false,
        message: "A connection request between these users already exists.",
      });
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status: connectionStatus,
    });

    const savedRequest = await connectionRequest.save();

    return res.status(201).json({
      success: true,
      data: savedRequest,
      message: "Connection request sent successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

module.exports = {
  sendConnectionRequest,
};
