const mongoose = require("mongoose");

const listingSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  address: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      // Place longitude first, then latitude
      // e.g. [-79.3968307, 43.6656976]
      type: [Number],
      required: true,
    },
  },
  owner: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  imageUrl: { type: String, required: true },
});

// Create geospatial index
listingSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Listing", listingSchema);
