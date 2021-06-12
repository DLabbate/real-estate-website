const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const listingRepository = require("../repositories/listing-repository");
const userRepository = require("../repositories/user-repository");
const noteRepository = require("../repositories/note-repository");

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
  const listing = new Listing({
    _id: new mongoose.Types.ObjectId(),
    ...listingData,
    owner: ownerId,
  });

  // Create a new listing
  let newListing = await listingRepository.createNewListing(listing);

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
      4) Delete all notes related to this listing

      */

  // #1) Delete the listing that belongs to the user making the request
  const promiseDeleteListing = listingRepository.deleteListing(listingId);

  // #2) Unset the "publishedListing" ref in the user document (of the user that owns the listing)
  const promiseRemovePublisedListingRef =
    userRepository.removePublishedListingReference(listingId);

  // #3) Delete this listingId from the favoritedListings array of all users
  const promiseRemoveFavoriteListingsRef =
    userRepository.removeFavoriteListingFromAllUsers(listingId);

  // #4) Delete all notes related to this listing
  const promiseDeleteNote = noteRepository.deleteNotesByListingId(listingId);

  await Promise.all([
    promiseDeleteListing,
    promiseRemovePublisedListingRef,
    promiseRemoveFavoriteListingsRef,
    promiseDeleteNote,
  ]);
};

/**
 * Search for listings with optional query parameters
 */
exports.searchListings = async (filter) => {
  return await listingRepository.searchListings(filter);
};
