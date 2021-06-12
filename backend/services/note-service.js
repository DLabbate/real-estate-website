const noteRepository = require("../repositories/note-repository");

/**
 * Formats a mongoose document
 */
exports.formatNote = async (noteDocument) => {
  noteObject = noteDocument.toObject();
  delete noteObject.__v;

  return noteObject;
};

/**
 * Formats an array of mongoose documents
 */
exports.formatNotesArray = async (noteArray) => {
  let formattedArray = [];
  for (const index in noteArray) {
    note = noteArray[index];
    formattedArray.push(await this.formatNote(note));
  }
  console.log(formattedArray);
  return formattedArray;
};

/**
 * Get a user's notes
 */
exports.getNotesByUserId = async (userId) => {
  let notes = await noteRepository.getNotesByUserId(userId);
  let i = 0;
  return await this.formatNotesArray(notes);
};

/**
 * Edit a user's note (e.g. change its category)
 */
exports.editNote = async (userId, noteId, newNoteData) => {
  let note = await noteRepository.editNote(userId, noteId, newNoteData);
  return await this.formatNote(note);
};
