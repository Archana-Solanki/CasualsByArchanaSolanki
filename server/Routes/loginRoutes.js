const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const crypto = require("crypto");
const { sendResetPasswordEmail } = require("../EmailService");

router.post("/login", async (req, res) => {
  try {
    const { userNumber, userPassword } = req.body;

    const existingUser = await User.findOne({ userNumber });

    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(
      userPassword,
      existingUser.userPassword
    );

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    // Generate JWT token
    const payload = {
      id: existingUser._id,
      userNumber: existingUser.userNumber,
      userName: existingUser.userName,
      userEmail: existingUser.userEmail,
    };
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");
      return res.status(500).json({ success: false, message: "Server misconfiguration" });
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Ensure this is false for localhost
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use lax for localhost
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        userName: existingUser.userName,
        userEmail: existingUser.userEmail,
        userNumber: existingUser.userNumber,
        userAddress: existingUser.userAddress,
        _id: existingUser._id,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ userEmail: email });

    if (!user) {
      return res.status(404).json({ message: "User not found !!" });
    }

    // 2. Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToekn = await bcrypt.hash(resetToken, 10);
    user.resetToken = hashedToekn;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await user.save();

  // 3. Prepare reset link (use FRONTEND_URL environment variable in production)
  const frontend = process.env.FRONTEND_URL || 'http://localhost:5173';
  const resetLink = `${frontend.replace(/\/$/, '')}/reset-password/${resetToken}`;

    // 4. Send password reset email
    await sendResetPasswordEmail(user.userEmail, resetLink);

    // 5. Respond to client
    res.status(200).json({ message: "Password reset link sent successfully" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if(!user)
      return res.status(404).json({message: "User not found !!"});

    const hashPass = await bcrypt.hash(newPassword, 10);
    user.userPassword = hashPass;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({success: true, message: "Password updated succesful"});
  } catch (error) {
    console.error("Error updating password", error);
    res.status(500).json({success: false, message: "Internal server error"});
  }
});

module.exports = router;
