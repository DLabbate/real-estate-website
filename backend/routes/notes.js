const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const noteController = require("../controllers/note-controller");

router.get("/", authentication, noteController.getNotes);

module.exports = router;
