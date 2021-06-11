const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user-repository");
require("dotenv").config();

exports.getUserByEmail = async (userEmail) => {
  console.log(`Finding user with email: ${userEmail}`);
  let user = await userRepository.getUserByEmail(userEmail);

  if (user) {
    return user.toObject();
  }

  return null;
};

exports.formatUser = async (userObject) => {
  delete userObject.password;
  delete userObject.__v;

  return userObject;
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

  await userRepository.createNewUser(user);
  console.log("Successfully saved user with hashed password");

  let userObject = user.toObject();
  // Don't show hashed password in the response
  return this.formatUser(userObject);
};

exports.validatePassword = async (userLoginData, userSavedData) => {
  // Check if password is correct
  let result = await bcrypt.compare(
    userLoginData.password,
    userSavedData.password
  );

  return result;
};

exports.getJWT = async (userData) => {
  const token = jwt.sign(
    // Put user info inside the payload
    {
      _id: userData._id,
      email: userData.email,
      favoriteListings: userData.favoriteListings,
      phoneNumber: userData.phoneNumber,
      publishedListing: userData.publishedListing,
    },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

exports.editUserInfo = async (oldUserData, newUserData) => {
  let updatedUser = await userRepository.editUserInfoById(
    oldUserData._id,
    newUserData
  );

  updatedUserObject = updatedUser.toObject();
  return this.formatUser(updatedUserObject);
};
