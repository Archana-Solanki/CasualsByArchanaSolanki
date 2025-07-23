const express = require('express');
const router = express.Router();
const CreateUser = require('../Models/userModel');
const authenticateToken = require('../Middleware/auth');

// GET: Fetch user profile
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const user = await CreateUser.findById(req.user.id).select("-password");

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
    const { userName, userEmail, userNumber, userAddress } = req.body;

    const updatedUser = await CreateUser.findByIdAndUpdate(
      req.user.id,
      {
        userName,
        userEmail,
        userNumber,
        userAddress,
      },
      { new: true, runValidators: true }
    ).select("-password");

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
