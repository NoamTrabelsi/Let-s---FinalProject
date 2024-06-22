const express = require("express");
const app = express();
const port = 5001;
app.use(express.json({ limit: "50mb" }));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { parseISO, formatISO } = require("date-fns");

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
  const { image, age, location, interests, trip_planning, about, reviews } =
    req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    user.image = image || user.image;
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

//search users by trip planning
app.post("/search", async (req, res) => {
  const { country, startDate, endDate, userId } = req.body;

  try {
    const startDateISO = startDate
      ? formatISO(parseISO(startDate), { representation: "date" })
      : null;
    const endDateISO = endDate
      ? formatISO(parseISO(endDate), { representation: "date" })
      : null;

    const query = {
      _id: { $ne: userId }, // Exclude the current user
      trip_planning: {
        $elemMatch: {
          country: { $regex: new RegExp(country, "i") },
          ...(startDateISO &&
            endDateISO && {
              $or: [
                {
                  endDate: { $gte: startDateISO },
                  startDate: { $lte: endDateISO },
                },
                {
                  startDate: { $gte: startDateISO },
                  endDate: { $lte: endDateISO },
                },
              ],
            }),
          ...(startDateISO &&
            !endDateISO && {
              endDate: { $gte: startDateISO },
            }),
          ...(!startDateISO &&
            endDateISO && {
              startDate: { $lte: endDateISO },
            }),
        },
      },
    };

    const users = await User.find(query);

    if (!users.length) {
      return res.status(404).send({ status: "error", data: "Users not found" });
    }

    res.send({ status: "ok", data: users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res
      .status(500)
      .send({ status: "error", data: "Error fetching users" });
  }
});

// Add review
app.post("/review/:id", async (req, res) => {
  const { review } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ status: "error", data: "User not found" });
    } else {
      user.reviews.unshift(review);
      await user.save();
      res.send({ status: "ok", data: "Review added" });
    }
  } catch (err) {
    res.status(500).send({ status: "error", data: "Error adding review" });
  }
});

//get reviews by user id
app.get("/get_reviews/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "error", data: "User not found" });
    }
    res.json({ status: "ok", data: user.reviews });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", data: "Server error" });
  }
});
