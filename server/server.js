const express = require("express");
const app = express();
const port = 5001;
const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: "50mb" }));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { parseISO, formatISO } = require("date-fns");

const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);

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
require("./models/Chat");
const Chat = mongoose.model("Chat");

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

//io connection
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, receiverId, message } = data;
      console.log("data", data);

      const newMessage = new Chat({
        senderId,
        receiverId,
        message,
      });
      await newMessage.save();

      io.emit("receiveMessage", newMessage);
    } catch (err) {
      console.log("Error handling the message");
    }

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
});

//io listen on port
server.listen(5000, () => {
  console.log("SocketIO running on port:5000");
});

app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    console.log("senderId", senderId);
    console.log("receiverId", receiverId);

    const messages = await Chat.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).populate("senderId", "_id firstName");

    res.status(200).json({ status: "ok", data: messages });
  } catch (err) {
    res.status(500).json({ status: "error", data: "Error fetching messages" });
  }
});

// Fetch chat users
app.get("/chat_users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all chats where the user is either the sender or receiver
    const chats = await Chat.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).populate("senderId receiverId", "_id firstName");

    //console.log("chats", chats);

    // Extract unique user IDs from the chats
    const userIds = new Set();
    chats.forEach((chat) => {
      if (chat.senderId && chat.senderId !== userId) {
        userIds.add(chat.senderId);
      }
      if (chat.receiverId && chat.receiverId !== userId) {
        userIds.add(chat.receiverId);
      }
    });

    //console.log("userIds", userIds);

    // Fetch user details for these user IDs
    const users = await User.find({ _id: { $in: Array.from(userIds) } });

    //console.log("users", users);

    res.send({ status: "ok", data: users });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .send({ status: "error", data: "Error fetching chat users" });
  }
});
