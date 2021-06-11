const mongoose = require("mongoose");
const User = require("../models/user");

exports.getUserByEmail = async (userEmail) => {
  let user = await User.findOne({ email: userEmail }).exec();
  if (user) {
    return user;
  }

  return null;
};

exports.createNewUser = async (user) => {
  return await user.save();
};

exports.editUserInfoById = async (userId, newUserData) => {
  let updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { favoriteListings: newUserData.favoriteListings } },
    { new: true }
  ).exec();

  return updatedUser;
};
