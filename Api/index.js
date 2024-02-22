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

User.find()
  .then((users) => {
    console.log("All users:", users);
  })
  .catch((error) => {
    console.error("Error fetching users:", error);
  });

app.post("/users", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const newUser = new User({
      name: {
        firstName,
        lastName,
      },
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});
