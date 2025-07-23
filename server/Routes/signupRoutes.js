const express = require('express');
const router = express.Router();
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;


router.post("/signup", async(req, res) => {

    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.userPassword, salt);
    try {
        const {
            userName,
            userNumber,
            userEmail,
            userAddress,
        } = req.body;

        const userData = {
            userName,
            userNumber,
            userEmail,
            userAddress,
            userPassword : secPass,
        }

        const user = new User(userData);
        await user.save();
        res.status(200).json({ success: true, message: "User created successfully" });


    } catch (error) {
        console.error("Error in adding user", error);
        res.status(500).json({success: false, error: "Internal Server Error"});
    }
});

module.exports = router;