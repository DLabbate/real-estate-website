const boardService = require("../services/board-service");

// exports.createNewBoard = async (req, res, next) => {
//   try {
//     // User Data from JWT
//     const userData = req.userData;

//     const board = await boardService.findBoardByUserId(userData._id);

//     if (board) {
//       console.log("Board already exists");
//       return res.status(409).json({ error: err });
//     } else {
//       const board = await boardService.createNewBoard(userData._id);
//       console.log("Successfully created a new board")
//     }
//   } catch (err) {
//     console.log("Error with listing delete", err);
//     return res.status(500).json({ error: err });
//   }
// };

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
  } catch (err) {
    console.log("Error with editing board", err);
    return res.status(500).json({ error: err });
  }
};
