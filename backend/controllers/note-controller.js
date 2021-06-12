const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const listingService = require("../services/listing-service");
const userService = require("../services/user-service");
const noteService = require("../services/note-service");

exports.getNotes = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    let notes = await noteService.getNotesByUserId(userData._id);

    return res.status(201).json(notes);
  } catch (err) {
    console.log("Error with getting user's notes", err);
    return res.status(500).json({ error: err });
  }
};

exports.editNote = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    const noteId = req.params.noteId;

    let notes = await noteService.editNote(noteId, req.body);

    return res.status(201).json(notes);
  } catch (err) {
    console.log("Error with editing user's notes", err);
    return res.status(500).json({ error: err });
  }
};
