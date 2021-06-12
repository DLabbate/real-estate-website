const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  // Email does not do any validation. It is only used for optimization
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  publishedListing: { type: mongoose.Schema.Types.ObjectId },
  favoriteListings: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Listing", default: [] },
  ],
});

module.exports = mongoose.model("User", userSchema);
