const mongoose = require("mongoose");
const Note = require("../models/note");

exports.createNewNote = async (userId, listingId) => {
  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    user: userId,
    listing: listingId,
    // Category will be set to its default value
  });
  return await note.save();
};

/**
 * Finds a note with the matching user and listing
 */
exports.findNote = async (userId, listingId) => {
  return Note.findOne({ user: userId, listing: listingId })
    .select("-__v")
    .exec();
};

/**
 * Get a user's notes (via userId)
 */
exports.getNotesByUserId = async (userId) => {
  return Note.find({ user: userId })
    .select("-__v")
    .populate({
      path: "listing",
      model: "Listing",
      select: "-__v",
      populate: {
        path: "owner",
        model: "User",
        select: "firstName lastName email phoneNumber",
      },
    })
    .exec();
};

/**
 * Deletes a single note where the "user" and "listingId" fields match the corresponding arguments
 */
exports.deleteNote = async (userId, listingId) => {
  return await Note.findOneAndDelete({
    user: userId,
    listing: listingId,
  }).exec();
};

exports.deleteNotesByListingId = async (listingId) => {
  return await Note.deleteMany({ listing: listingId }).exec();
};

exports.getNotesByListingId = async (listingId) => {
  return await Note.find({ listing: listingId }).exec();
};
