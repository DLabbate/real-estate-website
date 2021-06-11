const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const listingRepository = require("../repositories/listing-repository");
const userRepository = require("../repositories/user-repository");
const noteRepository = require("../repositories/note-repository");

exports.formatNote = async (noteDocument) => {
  noteObject = noteDocument.toObject();
  delete noteObject.__v;

  return noteObject;
};

exports.formatNotesArray = async (noteArray) => {
  let formattedArray = [];
  for (const index in noteArray) {
    note = noteArray[index];
    formattedArray.push(await this.formatNote(note));
  }
  console.log(formattedArray);
  return formattedArray;
};

// exports.createNewNote = async (userId, listingId) => {
//   let note = await noteRepository.createNewNote(userId, listingId);
//   return this.formatNote(note);
// };

exports.getNotesByUserId = async (userId) => {
  let notes = await noteRepository.getNotesByUserId(userId);
  let i = 0;
  return await this.formatNotesArray(notes);
};

exports.editNoteCategory = async (noteData, newNoteCategory) => {};
