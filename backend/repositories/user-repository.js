const mongoose = require("mongoose");
const User = require("../models/user");

/**
 * Queries a user by their email
 */
exports.getUserByEmail = async (userEmail) => {
  let user = await User.findOne({ email: userEmail }).exec();
  return user;
};

/**
 * Creates a new user document
 */
exports.createNewUser = async (user) => {
  return await user.save();
};

/**
 * Edit user info such as "favoriteListings"
 */
exports.editUserInfoById = async (userId, newUserData) => {
  let updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $set: { favoriteListings: newUserData.favoriteListings } },
    { new: true }
  ).exec();

  return updatedUser;
};

/**
 * When a user creates a new listing, we set their "publishedListing" reference to match the newly created listingId
 */
exports.updatePublishedListingReference = async (ownerId, listingId) => {
  return await User.updateOne(
    { _id: ownerId },
    { $set: { publishedListing: listingId } }
  ).exec();
};

/**
 * Removes the published listing of a user
 */
exports.removePublishedListingReference = async (listingId) => {
  User.updateOne(
    { publishedListing: listingId },
    { $unset: { publishedListing: listingId } }
  ).exec();
};

/**
 * Removes a single listing from a user's "favoriteListings" array
 */
exports.removeFavoriteListing = async (listingId) => {
  return User.updateMany(
    { favoriteListings: listingId },
    { $pull: { favoriteListings: listingId } }
  ).exec();
};
