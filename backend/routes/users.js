const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/authentication");
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

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((users) => {
      if (users.length < 1) {
        // In this case, no user account is associated with the specified email
        return res.status(401).json({ message: "Auth failed" });
      }
      // If we find an email, we should check if the password is correct
      const user = users[0];

      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(result);
        if (err) {
          // If we made it here --> Wrong Password!
          return res.status(401).json({ message: "Auth failed" });
        }
        if (result) {
          // If we made it here --> Good Password!
          const token = jwt.sign(
            // Put user info inside the payload
            {
              _id: user._id,
              email: user.email,
              favoriteListings: user.favoriteListings,
              phoneNumber: user.phoneNumber,
            },
            process.env.JWT_KEY,
            { expiresIn: "24h" }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({ message: "Auth failed" });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

/**
 * This method can be used to update the "favoriteListings" of a user
 */
router.patch("/edit", authentication, (req, res, next) => {
  // From JWT
  const userData = req.userData;
  console.log(req.userData);

  // From body
  const newUserData = req.body;
  console.log(newUserData);

  User.updateOne(
    { _id: userData._id },
    { $set: { favoriteListings: newUserData.favoriteListings } }
  )
    .exec()
    .then((result) => {
      const user = new User({ ...result });
      console.log(result);
      res.status(200).json({ message: "Updated user info" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
