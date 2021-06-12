const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const noteController = require("../controllers/note-controller");

router.get("/", authentication, noteController.getNotes);

router.patch("/:noteId", authentication, noteController.editNote);

module.exports = router;
