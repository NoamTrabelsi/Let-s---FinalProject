const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  user1Id: {
    type: String,
    required: true,
  },
  user1Clicked: {
    type: Boolean,
    default: false,
  },
  user2Id: {
    type: String,
    required: true,
  },
  user2Clicked: {
    type: Boolean,
    default: false,
  },
  bothClicked: {
    type: Boolean,
    default: false,
  },
});

const Match = mongoose.model("Matches", MatchSchema);
