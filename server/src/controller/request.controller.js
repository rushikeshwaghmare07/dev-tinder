const mongoose = require("mongoose");
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

const updateConnectionRequestStatus = async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    // Validate requestId as a valid ObjectId
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid review status. Allowed statuses are 'accepted' or 'rejected'.`,
      });
    }

    // Validate requestId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid request ID format.",
      });
    }

    // Find the pending connection request
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });


    if (!connectionRequest) {
      return res.status(404).json({
        success: false,
        message: "No pending connection request found for this user.",
      });
    }

    connectionRequest.status = status;

    const updatedRequest = await connectionRequest.save();

    return res.status(200).json({
      success: true,
      data: updatedRequest,
      message: `Connection request has been ${status}.`,
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
  updateConnectionRequestStatus,
};
