const mongoose = require("mongoose");
const Board = require("../models/board");

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
  return await Board.findOne({ user: userId }).select("-__v").exec();
};

exports.editBoard = async (userId, newBoard) => {
  const board = await Board.findOneAndUpdate({ user: userId }, newBoard, {
    new: true,
  })
    .select("-__v")
    .exec();
  return board.toObject();
};
