const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");

/**
 * Queries a single listing via the ownerId
 */
exports.getListingByOwnerId = async (ownerId) => {
  return await Listing.findOne({ owner: ownerId });
};

/**
 * Creates a new listing document
 */
exports.createNewListing = async (listing) => {
  return await listing.save();
};

/**
 * Deletes a listing document
 */
exports.deleteListing = async (listingId) => {
  return await Listing.deleteOne({ _id: listingId }).exec();
};
