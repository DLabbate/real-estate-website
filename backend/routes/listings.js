const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const authentication = require("../middleware/authentication");

router.post("/", authentication, async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    let exists = await Listing.findOne({ owner: userData._id });

    // Ensure that a user can have only one listing at a time
    if (exists) {
      return res
        .status(409)
        .json({ message: "User can only have one listing at a time!" });
    }

    const listing = new Listing({
      _id: new mongoose.Types.ObjectId(),
      ...req.body,
      owner: userData._id,
    });

    let result = await listing.save();

    if (result) {
      console.log(listing);
      return res.status(201).json({
        message: "Listing created",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

router.delete("/", authentication, async (req, res, next) => {
  try {
    // User Data from JWT
    const userData = req.userData;

    // We should delete the listing that belongs to the user making the request
    let result = await Listing.deleteOne({ owner: userData._id });

    if (result) {
      return res.status(201).json({
        message: "Listing deleted",
      });
    }
  } catch (err) {
    onsole.log(err);
    return res.status(500).json({ error: err });
  }
});

module.exports = router;
