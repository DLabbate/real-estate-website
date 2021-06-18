const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  columns: [
    {
      columnName: { type: String },
      items: [{ type: mongoose.Types.ObjectId, ref: "Note" }],
    },
  ],
});

module.exports = mongoose.model("Board", boardSchema);
