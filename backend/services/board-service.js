const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Board = require("../models/board");
const User = require("../models/user");
const listingRepository = require("../repositories/listing-repository");
const userRepository = require("../repositories/user-repository");
const noteRepository = require("../repositories/note-repository");
const boardRepository = require("../repositories/board-repository");

/**
 * Creates a new board (should be called when a user signs up)
 */
exports.createNewBoard = async (userId) => {
  return await boardRepository.createNewBoard(userId);
};

/**
 * Finds a board by userId
 */
exports.findBoardByUserId = async (userId) => {
  return await boardRepository.findBoardByUserId(userId).toObject();
};

exports.editBoard = async (userId, newBoard) => {
  return await boardRepository.editBoard(userId, newBoard).toObject();
};

exports.removeNotesFromAllBoardsByListingId = async (listingId) => {
  // Get the array of notes that are related to the listingId
  const notesToDelete = await noteRepository.getNotesByListingId(listingId);

  console.log(
    "Attempting to delete all notes in the board related to: ",
    notesToDelete
  );
  // Delete the note from all boards
  let i;
  for (i = 0; i < notesToDelete.length; i++) {
    return await boardRepository.removeNoteFromAllBoards(notesToDelete[i]._id);
  }
  //   notesToDelete.forEach(async (note) => {
  //     await boardRepository.removeNoteFromAllBoards("60cc2ee2d50cb007e02123b9");
  //   });
};
