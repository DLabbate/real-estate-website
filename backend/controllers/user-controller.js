const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userService = require("../services/user-service");
require("dotenv").config();

exports.userSignup = async (req, res, net) => {
  try {
    const userData = req.body;

    // First check if the email already exists
    let user = await userService.getUser(userData);

    if (user) {
      // If a user already exists, return an error
      console.log(`Email ${userData.email} already exists!`);
      return res
        .status(409)
        .json({ error: { message: "Email already exists!" } });
    } else {
      const userObject = await userService.createNewUser(userData);
      return res.status(201).json(userObject);
    }
  } catch (err) {
    console.log("Error with user signup", err);
    return res.status(500).json({ error: err });
  }
};

exports.userLogin = async (req, res, next) => {
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
          publishedListing: user.publishedListing,
        },
        process.env.JWT_KEY,
        { expiresIn: "24h" }
      );
      console.log("Correct Password!");

      let userObject = user.toObject();
      delete userObject.password;
      delete userObject.__v;
      return res.status(200).json({
        //message: "Auth successful",
        ...userObject,
        token: token,
      });
    }
  } catch (err) {
    console.log("Error with user login", err);
    return res.status(500).json({ error: err });
  }
};

exports.userEdit = async (req, res, next) => {
  try {
    // From JWT
    const userData = req.userData;
    console.log(req.userData);

    // From body
    const newUserData = req.body;
    console.log(newUserData);

    let updatedUser = await User.findOneAndUpdate(
      { _id: userData._id },
      { $set: { favoriteListings: newUserData.favoriteListings } },
      { new: true }
    ).exec();

    updatedUserObject = updatedUser.toObject();
    delete updatedUserObject.password;
    delete updatedUserObject.__v;

    console.log("Successfully updated user");
    res.status(200).json(updatedUserObject);
  } catch (err) {
    console.log("Error with user edit", err);
    return res.status(500).json({ error: err });
  }
};
