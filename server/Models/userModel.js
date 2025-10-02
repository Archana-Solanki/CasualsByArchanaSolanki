const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
    required: true
  },

  productQuantity:{
    type: Number,
    required: true
  },

  productColor:{
    type: String,
    required: true
  },

  productSize: {
    type: String,
    required: true
  }
});


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

  userAddressLine1: {
    type: String,
    required: true,
  },

  userAddressLine2: {
    type: String,
  },

  userAddressPincode: {
    type: String,
    required: true,
  },

  userAddressCity:{
    type:String,
    required: true,
  },

  userAddressState: {
    type: String,
    required: true,
  },

  userPassword: {
    type: String,
    required: true,
    minlength: 8,
  },

  userRole: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  resetToken: {
    type: String,
  },

  resetTokenExpiry: {
    type: Date,
  },

  signUpDate: {
    type: Date,
    default: Date.now,
  },

  cartData:{
    type: [cartSchema]
  }
});

module.exports = mongoose.model("Users", userSchema);
