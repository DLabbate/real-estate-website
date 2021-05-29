const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signup", (req, res, net) => {
  // First check if the email already exists
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      // An email should only be associated with 1 user account
      if (users.length >= 1) {
        return res.status(409).json({ message: "Email exists!" });
      } else {
        (err) => {
          console.log(err);
          res.status(500).json({ error: err });
        };
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  // If the email is NOT associated with any user account, we can now hash the password with a salt
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        // Can't store the RAW password in the database!
        password: hash,
        phoneNumber: req.body.phoneNumber,
      });
      user
        .save()
        .then((result) => {
          console.log(result);
          res.status(201).json({ message: "User created" });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: err });
        });
    }
  });
});

module.exports = router;
