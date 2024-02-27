const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("./models/route");
require("./config/connectDB");
const User = require("./config/connectDB");

app.use(express.static("./static"), express.json());

app.listen(PORT, () => {
  console.log(`The server is running on port : ${PORT} 👌`);
});

// Fetch all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
    console.log("All users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Register a user
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, idNumber, dob } = req.body;

    const existingUser = await User.findOne({ idNumber });
    if (existingUser) {
      return res.status(400).json({ error: "ID number already exists" });
    }

    // Create a new user document
    const newUser = new User({
      name: {
        firstName,
        lastName,
      },
      idNumber,
      dob,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});
