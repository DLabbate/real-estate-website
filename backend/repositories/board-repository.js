const mongoose = require("mongoose");
const Board = require("../models/Board");

/**
 * Creates a new board. Only 1 per user.
 */
exports.createNewBoard = async (userId) => {
  const board = new Board({
    _id: new mongoose.Types.ObjectId(),
    user: userId,
    columns: [
      {
        columnName: "queue",
        items: [],
      },
      {
        columnName: "notInterested",
        items: [],
      },
      {
        columnName: "interested",
        items: [],
      },
      {
        columnName: "offers",
        items: [],
      },
    ],
  });

  return await board.save();
};

/**
 * Finds a board by userId
 */
exports.findBoardByUserId = async (userId) => {
  return await Board.findOne({ user: userId });
};
