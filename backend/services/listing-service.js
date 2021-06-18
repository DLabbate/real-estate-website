const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const listingRepository = require("../repositories/listing-repository");
const userRepository = require("../repositories/user-repository");
const noteRepository = require("../repositories/note-repository");
const boardRepository = require("../repositories/board-repository");
const boardService = require("./board-service");
const AWS = require("aws-sdk");

/**
 * Formats a listing document (for instance, removes unused fields such as "__v")
 */
exports.formatListingDocument = async (listingDocument) => {
  let listingObject = listingDocument.toObject();
  delete listingObject.__v;

  return listingObject;
};

/**
 * Get a listing via owner ID
 */
exports.getListingByOwnerId = async (ownerId) => {
  return await listingRepository.getListingByOwnerId(ownerId);
};

/**
 * Creates a new listing
 */
exports.createNewListing = async (ownerId, listingData, imageUrl) => {
  const listing = new Listing({
    _id: new mongoose.Types.ObjectId(),
    ...listingData,
    owner: ownerId,
    imageUrl: imageUrl,
  });

  // Create a new listing
  let newListing = await listingRepository.createNewListing(listing);

  // We should now update the reference in the User model
  await userRepository.updatePublishedListingReference(ownerId, newListing._id);

  return await this.formatListingDocument(newListing);
};

/**
 * Deletes a listing
 */
exports.deleteListing = async (listingId, imageUrl) => {
  // Delete notes that reference this listing in the "board" collection
  // Do this before deleting the notes, because the board must know the noteId!!!

  // const promiseDeleteNotesFromBoards =
  //   await boardService.removeNotesFromAllBoardsByListingId(listingId);

  // Get the array of notes that are related to the listingId
  const notesToDelete = await noteRepository.getNotesByListingId(listingId);
  await boardRepository.removeNoteListFromAllBoards(notesToDelete);

  // The rest can be done in parallel

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

  // The image file should also be removed from AWS S3
  await this.deleteS3Object(imageUrl);
};

/**
 * Deletes the listing image from AWS S3 Bucket
 */
exports.deleteS3Object = async (imageUrl) => {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // Delete AWS S3 image object
  const keyArray = imageUrl.split("/");

  // Get the filename to delete
  const uniqueKey = keyArray[keyArray.length - 1];

  console.log("Attempting to delete S3 Object with name: ", uniqueKey);

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uniqueKey,
  };

  s3.deleteObject(params, (error, data) => {
    if (error) {
      console.log("Error deleting S3 Object", error);
      return res
        .status(500)
        .json({ error: "Failed to delete image from AWS S3" });
    }
    console.log(data);
  });
};

/**
 * Search for listings with optional query parameters
 */
exports.searchListings = async (filter) => {
  return await listingRepository.searchListings(filter);
};
