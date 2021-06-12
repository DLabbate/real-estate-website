const noteService = require("../services/note-service");

/**
 * Get a user's notes
 */
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

/**
 * Edit a user's note (e.g. change its category)
 */
exports.editNote = async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    const noteId = req.params.noteId;

    let notes = await noteService.editNote(userData._id, noteId, req.body);

    return res.status(201).json(notes);
  } catch (err) {
    console.log("Error with editing user's notes", err);
    return res.status(500).json({ error: err });
  }
};
