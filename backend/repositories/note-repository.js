const mongoose = require("mongoose");
const Note = require("../models/note");

/**
 * Creates a single new note
 */
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
 * Get a user's notes
 */
exports.getNotesByUserId = async (userId) => {
  return Note.find({ user: userId }).select("-__v").exec();
};

/**
 * Edit a user's note (e.g. change its category)
 */
exports.editNote = async (userId, noteId, newNoteData) => {
  return await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    { $set: { category: newNoteData.category } },
    { new: true }
  )
    .select("-__v")
    .exec();
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
