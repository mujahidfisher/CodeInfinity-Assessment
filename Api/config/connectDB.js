const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  idNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    required: true,
  },
});

userSchema.index({ idNumber: 1, dob: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
