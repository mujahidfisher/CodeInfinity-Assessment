const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
      firstName: {
        type: String,
        required: true
      },
      lastName: {
        type: String,
        required: true
      }
    }
  })
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;
