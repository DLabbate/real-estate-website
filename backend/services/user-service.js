const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getUser = async (userData) => {
  console.log(`Finding user with email: ${userData.email}`);
  let user = await User.findOne({ email: userData.email }).exec();
  return user;
};

exports.createNewUser = async (userData) => {
  const hash = await bcrypt.hash(userData.password, 10);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    email: userData.email,
    // Can't store the RAW password in the database!
    password: hash,
    phoneNumber: userData.phoneNumber,
  });

  await user.save();
  console.log("Successfully saved user with hashed password");

  let userObject = user.toObject();
  // Don't show hashed password in the response
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};
