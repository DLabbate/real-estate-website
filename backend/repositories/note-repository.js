const mongoose = require("mongoose");
const Note = require("../models/note");
const User = require("../models/user");
const Listing = require("../models/listing");

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
  return Note.findOne({ user: userId, listing: listingId }).exec();
};

exports.getNotesByUserId = async (userId) => {
  return Note.find({ user: userId }).exec();
};

exports.editNote = async (userId, noteId, newNoteData) => {
  return await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    { $set: { category: newNoteData.category } },
    { new: true }
  ).exec();
};

/**
 * Deletes a single note where the "user" and "listingId" fields match the corresponding arguments
 */
exports.deleteNote = async (userId, listingId) => {
  return await Note.deleteOne({ user: userId, listing: listingId }).exec();
};

/**
 * Deletes all notes where the "listingId" matches
 */
exports.deleteNotesByListingId = async (listingId) => {
  return await Note.deleteMany({ listing: listingId }).exec();
};
