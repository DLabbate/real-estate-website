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

exports.deleteNote = async (userId, listingId) => {
  return await Note.deleteOne({ user: userId, listing: listingId });
};

/**
 * Finds a note with the matching user and listing
 */
exports.findNote = async (userId, listingId) => {
  return Note.findOne({ user: userId, listing: listingId });
};
