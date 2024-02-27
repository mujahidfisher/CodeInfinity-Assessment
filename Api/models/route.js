const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MongoDB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
