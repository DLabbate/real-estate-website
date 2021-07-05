const boardService = require("../services/board-service");

exports.getBoard = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    const board = await boardService.findBoardByUserId(userData._id);
    console.log(board);

    if (board) {
      return res.status(200).json(board);
    } else {
      return res.status(404).json({ error: { message: "Board not found!" } });
    }
  } catch (err) {
    console.log("Error with getting board", err);
    return res.status(500).json({ error: err });
  }
};

exports.editBoard = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    const newBoard = req.body;
    const updatedBoard = await boardService.editBoard(userData._id, req.body);
    console.log("Updated board: ", updatedBoard);

    return res.status(200).json(updatedBoard);
  } catch (err) {
    console.log("Error with editing board", err);
    return res.status(500).json({ error: err });
  }
};
