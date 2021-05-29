const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const authentication = require("../middleware/authentication");

router.post("/", authentication, (req, res, next) => {
  const listing = new Listing({
    _id: new mongoose.Types.ObjectId(),
    ...req.body,
  });

  listing
    .save()
    .then((result) => {
      console.log(listing);
      res.status(201).json({
        message: "Listing created",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
