const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing");

router.post("/", (req, res, next) => {
  const listing = new Listing({
    _id: new mongoose.Types.ObjectId(),
    // address: req.body.address,
    // price: req.body.price,
    // coordinates: {
    //   latitude: req.body.coordinates.latitude,
    //   longitude: req.body.coordinates.longitude,
    // },
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
