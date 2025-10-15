const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const Joi = require ("joi");

const signUpShema = Joi.object({
  userName: Joi.string().min(2).max(50).trim().required(),
  userNumber: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
  userEmail: Joi.string().email().required(),
  userPassword: Joi.string()
    .min(8)
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required(),
  userAddressLine1: Joi.string().min(5).required(),
  userAddressPincode: Joi.string()
    .pattern(/^\d{6}$/)
    .required(),
  userAddressCity: Joi.string().min(2).required(),
  userAddressState: Joi.string().required(),
});

router.post("/signup", async (req, res) => {
  const { error } = signUpShema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const salt = await bcrypt.genSalt(10);
  let secPass = await bcrypt.hash(req.body.userPassword, salt);
  try {
    const {
      userName,
      userNumber,
      userEmail,
      userAddressLine1,
      userAddressLine2,
      userAddressPincode,
      userAddressCity,
      userAddressState,
    } = req.body;

    const userData = {
      userName,
      userNumber,
      userEmail,
      userAddressLine1,
      userAddressLine2,
      userAddressPincode,
      userAddressCity,
      userAddressState,
      userPassword: secPass,
    };

    const user = new User(userData);
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error in adding user", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
