const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  listing: { type: mongoose.Schema.ObjectId, ref: "Listing", required: true },
});

module.exports = mongoose.model("Note", noteSchema);
