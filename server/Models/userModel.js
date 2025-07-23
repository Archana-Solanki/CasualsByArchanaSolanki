const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },

  userNumber: {
    type: String,
    required: true,
  },

  userEmail: {
    type: String,
    required: true,
  },

  userAddress: {
    type: String,
    required: true,
  },

  userPassword: {
    type: String,
    required: true,
    minlength: 8,
  },

  userRole:{
    type: String,
    enum: ["user" , "admin"],
    default: "user"
  },

  resetToken:{
    type: String
  },

  resetTokenExpiry:{
    type: Date
  },

  signUpDate:{
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", userSchema);
