const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    age: Number,
    gender: String,
    image: String,
    location: String,
    interests: {
      food: [Number],
      sleep: [Number],
      movement: [Number],
      adventure: [Number],
    },
    trip_planning: [
      {
        country: String,
        startDate: String,
        endDate: String,
      },
    ],
    about: String,
    reviews: [
      {
        name: String,
        age: Number,
        location: String,
        rating: Number,
        text: String,
        leftBy: String,
      },
    ],
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserSchema);
