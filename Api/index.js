const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
require("./models/route");
require("./config/connectDB");
const User = require("./config/connectDB");
const { ObjectId } = require("mongodb");

app.use(express.static("./static"), express.json());

app.listen(PORT, () => {
  console.log(`The server is running on port : ${PORT} 👌`);
});

//All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({users});
    console.log("All users:", users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Single User
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(req.params.id)) {
    User.findOne({ _id: new ObjectId(id) })
      .maxTimeMS(30000)
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could'nt fetch data." });
      });
  } else {
    res.status(500).json({ error: "Not a valid data id" });
  }
});

//Register a user
app.post("/register", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const newUser = new User({
      name: {
        firstName,
        lastName,
      },
    }).maxTimeMS(30000);

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Delete a user
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  if (ObjectId.isValid(req.params.id)) {
    User.deleteOne({ _id: new ObjectId(id) })
      .maxTimeMS(30000)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could'nt fetch data." });
      });
  } else {
    res.status(500).json({ error: "Not a valid data id" });
  }
});