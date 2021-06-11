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
  /*   
      When we delete a listing, we must do the following
      1) Delete the listing that belongs to the user making the request
      2) Unset the "publishedListing" field in the user document (of the user that owns the listing)
      3) Delete this listingId from the favoritedListings array of all users

      */

  // #1) Delete the listing that belongs to the user making the request
  await listingRepository.deleteListing(listingId);

  // #2) Unset the "publishedListing" ref in the user document (of the user that owns the listing)
  await userRepository.removePublishedListingReference(listingId);

  // #3) Delete this listingId from the favoritedListings array of all users
  await userRepository.removeFavoriteListing(listingId);
};

/**
 * Search for listings with optional query parameters
 */
exports.searchListings = async (filter) => {
  return await listingRepository.searchListings(filter);
};
