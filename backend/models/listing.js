const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  address: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Listing", listingSchema);
