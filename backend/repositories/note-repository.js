const mongoose = require("mongoose");
const Note = require("../models/note");
const User = require("../models/user");
const Listing = require("../models/listing");

exports.createNewNote = async (note) => {
  return await note.save();
};
