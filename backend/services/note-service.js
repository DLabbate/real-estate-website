const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const listingRepository = require("../repositories/listing-repository");
const userRepository = require("../repositories/user-repository");
const noteRepository = require("../repositories/note-repository");

exports.formatNote = async (noteDocument) => {
  noteObject = noteDocument.noteObject();
  delete noteObject.__v;
};

// exports.createNewNote = async (userId, listingId) => {
//   let note = await noteRepository.createNewNote(userId, listingId);
//   return this.formatNote(note);
// };
