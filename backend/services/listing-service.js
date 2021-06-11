const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const listingRepository = require("../repositories/listing-repository");
const userRepository = require("../repositories/user-repository");

/**
 * Get a listing via owner ID
 */
exports.getListingByOwnerId = async (ownerId) => {
  return await listingRepository.getListingByOwnerId(ownerId);
};

/**
 * Creates a new listing
 */
exports.createNewListing = async (ownerId, listingData) => {
  // Create a new listing
  let newListing = await listingRepository.createNewListing(listingData);

  // We should now update the reference in the User model
  await userRepository.updatePublishedListingReference(ownerId, newListing._id);

  return newListing;
};

/**
 * Deletes a listing
 */
exports.deleteListing = async (listingId) => {
  await listingRepository.deleteListing(listingId);
};
