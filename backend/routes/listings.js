const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const User = require("../models/user");
const authentication = require("../middleware/authentication");

/**
 * Creating a new listing. Note a user can only have 1 active listing at a time.
 */
router.post("/", authentication, async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    let exists = await Listing.findOne({ owner: userData._id });

    // Ensure that a user can have only one listing at a time
    if (exists) {
      console.log("User can only have one listing at a time!");
      return res.status(409).json({
        error: { message: "User can only have one listing at a time!" },
      });
    }

    const listing = new Listing({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      owner: userData._id,
    });

    let result = await listing.save();

    if (result) {
      console.log("Listing created");

      let userDocument = await User.updateOne(
        { _id: userData._id },
        { $set: { publishedListing: result._id } }
      ).exec();

      return res.status(201).json({
        message: "Listing created",
      });
    }
  } catch (err) {
    console.log("Error with listing post", err);
    return res.status(500).json({ error: err });
  }
});

/**
 * Deleting a user's listing.
 */
router.delete("/", authentication, async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    // We should delete the listing that belongs to the user making the request
    let result = await Listing.deleteOne({ owner: userData._id });

    if (result) {
      console.log("Listing deleted");
      return res.status(201).json({
        message: "Listing deleted",
      });
    }
  } catch (err) {
    console.log("Error with listing delete", err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
