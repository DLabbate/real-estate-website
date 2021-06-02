const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  address: { type: String, required: true },
  price: { type: Number, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  owner: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Listing", listingSchema);
