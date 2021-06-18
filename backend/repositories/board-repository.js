const mongoose = require("mongoose");
const Board = require("../models/board");

const populateQuery = {
  path: "columns",
  populate: {
    path: "items",
    model: "Note",
    select: "-__v",
    populate: {
      path: "listing",
      model: "Listing",
      select: "-__v",
    },
  },
};
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
  return await Board.findOne({ user: userId })
    .select("-__v")
    .populate(populateQuery)
    .exec();
};

/**
 * Edits the user's board (e.g moving the order of listings, moving a listing to a new column, etc.)
 */
exports.editBoard = async (userId, newBoard) => {
  const board = await Board.findOneAndUpdate({ user: userId }, newBoard, {
    new: true,
  })
    .populate(populateQuery)
    .select("-__v")
    .exec();
  return board;
};

/**
 * Adds a note to the queue (e.g. when a user favorites a listing)
 */
exports.addToQueue = async (userId, noteId) => {
  // columns[0] is the queue
  return await await Board.findOneAndUpdate(
    { user: userId },
    { $push: { "columns.0.items": noteId } }
  );
};

/**
 * Removes a note from all columns (e.g. when a user unfavorites a listing)
 */
exports.removeNoteFromColumns = async (userId, noteId) => {
  const boardDocument = await Board.findOne({ user: userId }).exec();

  console.log("Board Document", boardDocument.toObject());
  boardDocument.columns.forEach((column) => {
    let indexToRemove = column.items.findIndex((note) => note._id === noteId);

    if (indexToRemove) {
      column.items.splice(indexToRemove, 1);
    }
  });

  return await boardDocument.save();
};

/**
 * Removes a single note from ALL boards.
 */
exports.removeNoteFromAllBoards = async (noteId) => {
  const boards = await Board.updateMany(
    {},
    { $pull: { "columns.$[].items": noteId } }
  ).exec();
  return boards;
};

/**
 * Removes a list of notes from ALL Boards
 */
exports.removeNoteListFromAllBoards = async (notesToDelete) => {
  // Delete the note from all boards
  let i;
  for (i = 0; i < notesToDelete.length; i++) {
    await this.removeNoteFromAllBoards(notesToDelete[i]._id);
  }
};
