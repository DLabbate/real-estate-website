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

/**
 * Edits a user's board
 */
exports.editBoard = async (userId, newBoard) => {
  return await boardRepository.editBoard(userId, newBoard).toObject();
};
