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
 * When a user deletes their published listing, we should therefore remove the "publishedListing" field accordingly
 */
exports.removePublishedListingReference = async (listingId) => {
  await User.updateOne(
    { publishedListing: listingId },
    { $unset: { publishedListing: listingId } }
  ).exec();
};

/**
 * Removes a single listing from the "favoriteListings" array of ALL users
 */
exports.removeFavoriteListingFromAllUsers = async (listingId) => {
  return await User.updateMany(
    { favoriteListings: listingId },
    { $pull: { favoriteListings: listingId } }
  ).exec();
};

/**
 * Adds a single listing to the "favoriteListings" array of ONE user
 */
exports.addFavoriteListing = async (userId, listingId) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { favoriteListings: listingId } },
    { new: true }
  );
};

/**
 * Deletes a listing from a single user's favorites
 */
exports.removeFavoriteListing = async (userId, listingId) => {
  return await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { favoriteListings: listingId } },
    { new: true }
  );
};
