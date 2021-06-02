const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");
require("dotenv").config();

/**
 * User signup. Email must be unique!
 */
router.post("/signup", async (req, res, net) => {
  try {
    // First check if the email already exists
    let user = await User.findOne({ email: req.body.email }).exec();
    console.log(`Checking if user exists with email ${req.body.email}:`, user);

    if (user) {
      // If a user already exists, return an error
      return res
        .status(409)
        .json({ error: { message: "Email already exists!" } });
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        // Can't store the RAW password in the database!
        password: hash,
        phoneNumber: req.body.phoneNumber,
      });

      let result = await user.save();

      if (result) {
        console.log("Successfully saved user with hashed password");
        return res.status(201).json(result);
      }
    }
  } catch (err) {
    console.log("Error with user signup", err);
    return res.status(500).json({ error: err });
  }
});

/**
 * Login, and if successful respond with a JWT + user info
 */
router.post("/login", async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    console.log(`Checking if user exists with email ${req.body.email}:`, user);
    if (!user) {
      // In this case, no user account is associated with the specified email
      console.log("No user account is associated with the specified email");
      return res.status(401).json({ error: { message: "Auth failed" } });
    }

    let result = await bcrypt.compare(req.body.password, user.password);

    if (!result) {
      console.log("Incorrect Password!");
      return res.status(401).json({ error: { message: "Auth failed" } });
    } else {
      // If we made it here --> Good Password!
      const token = jwt.sign(
        // Put user info inside the payload
        {
          _id: user._id,
          email: user.email,
          favoriteListings: user.favoriteListings,
          phoneNumber: user.phoneNumber,
        },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );
      console.log("Correct Password!");
      return res.status(200).json({
        //message: "Auth successful",
        email: user.email,
        phoneNumber: user.phoneNumber,
        favoriteListings: user.favoriteListings,
        token: token,
      });
    }
  } catch (err) {
    console.log("Error with user login", err);
    return res.status(500).json({ error: err });
  }
});

/**
 * This method can be used to update the "favoriteListings" of a user
 */
router.patch("/edit", authentication, async (req, res, next) => {
  try {
    // From JWT
    const userData = req.userData;
    console.log(req.userData);

    // From body
    const newUserData = req.body;
    console.log(newUserData);

    let result = await User.updateOne(
      { _id: userData._id },
      { $set: { favoriteListings: newUserData.favoriteListings } }
    ).exec();

    if (result) {
      console.log("Successfully updated user");
      res.status(200).json({ message: "Updated user info" });
    }
  } catch (err) {
    console.log("Error with user edit", err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
