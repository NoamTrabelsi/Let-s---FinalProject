const express = require("express");
const app = express();
const port = 5001;
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// MongoDB connection
const mongoUrl =
  "mongodb+srv://maratzi:ZngrMrt2109!@cluster0.xnzxrre.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error: ", err));

// JWT secret key
const JWT_SECRET = "mySuperSecretKey12345!";

// Models
require("./models/User");
const User = mongoose.model("UserInfo");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Registration
app.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, gender } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.send({ data: "User already exists" });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      gender,
    });
    res.send({
      status: "ok",
      data: { id: newUser._id, message: "User created" },
    });
  } catch (err) {
    res.send({ status: "error", data: "Error creating user" });
  }
});

// Update user
app.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { age, location, interests, trip_planning, about, reviews } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    user.age = age || user.age;
    user.location = location || user.location;
    user.interests = interests || user.interests;
    user.trip_planning = trip_planning || user.trip_planning;
    user.about = about || user.about;
    user.reviews = reviews || user.reviews;

    await user.save();
    res.send({ status: "ok", data: "User updated" });
  } catch (err) {
    res.status(500).send({ status: "error", data: "Error updating user" });
  }
});

// Get user by id
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get user by token
app.post("/user", async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    res.send({ status: "ok", data: user });
  } catch (err) {
    return res
      .status(500)
      .send({ status: "error", data: "Error fetching user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const oldUser = await User.findOne({ email });

  if (!oldUser) {
    return res.send({ data: "User does not exist" });
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);

    res.status(201).send({ status: "ok", data: { token } });
  } else {
    return res.send({ status: "error", data: "Incorrect password" });
  }
});
