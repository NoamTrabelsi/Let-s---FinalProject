const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInfo",
    },
  ],
  messages: [messageSchema],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
