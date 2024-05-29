const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    message: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    seen: { type: Boolean, default: false },
  },
  {
    timeseries: true,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.ObjectId, required: true, ref: "User" },
    receiver: { type: mongoose.Schema.ObjectId, required: true },
    messages: [{ type: mongoose.Schema.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

const conversationModel = mongoose.model("conversation", conversationSchema);

const messageModel = mongoose.mongo.model("message", messagesSchema);

module.exports = { messageModel, conversationModel };
