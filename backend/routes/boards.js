const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const boardController = require("../controllers/board-controller");

router.get("/", authentication, boardController.getBoard);

router.patch("/", authentication, boardController.editBoard);

module.exports = router;
