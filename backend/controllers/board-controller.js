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
