const noteRepository = require("../repositories/note-repository");

/**
 * Formats a mongoose document (For instance, remves the "__v" field)
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

exports.getNotesByUserId = async (userId) => {
  let notes = await noteRepository.getNotesByUserId(userId);
  return notes;
};
