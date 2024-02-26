const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MongoDB_URL, {
    serverSelectionTimeoutMS: 3000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
    bufferTimeoutMS: 60000,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
