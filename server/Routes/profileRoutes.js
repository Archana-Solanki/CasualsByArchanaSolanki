const express = require('express');
const router = express.Router();
const CreateUser = require('../Models/userModel');
const authenticateToken = require('../Middleware/auth');

// GET: Fetch user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    // exclude the hashed password field (model uses userPassword)
    const user = await CreateUser.findById(req.user.id).select("-userPassword");

    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }

    res.json(user);
  } catch (error) {
    console.log("Error Fetching user profile", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT: Update user profile
router.put("/update", authenticateToken, async (req, res) => {
  try {
    // Only allow updating a small set of fields to prevent privilege escalation
    const allowed = {};
    const {
      userName,
      userEmail,
      userNumber,
      userAddressLine1,
      userAddressLine2,
      userAddressPincode,
      userAddressCity,
      userAddressState,
    } = req.body;

    if (userName) allowed.userName = userName;
    if (userEmail) allowed.userEmail = userEmail;
    if (userNumber) allowed.userNumber = userNumber;
    if (userAddressLine1) allowed.userAddressLine1 = userAddressLine1;
    if (userAddressLine2) allowed.userAddressLine2 = userAddressLine2;
    if (userAddressPincode) allowed.userAddressPincode = userAddressPincode;
    if (userAddressCity) allowed.userAddressCity = userAddressCity;
    if (userAddressState) allowed.userAddressState = userAddressState;

    const updatedUser = await CreateUser.findByIdAndUpdate(
      req.user.id,
      allowed,
      { new: true, runValidators: true }
    ).select("-userPassword");

    if (!updatedUser) {
      return res.status(404).json({ error: "User Not Found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
