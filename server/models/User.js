const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    age: Number,
    gender: String,
    image: Buffer,
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
      },
    ],
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserSchema);
