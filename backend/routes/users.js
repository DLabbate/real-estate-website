const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const userController = require("../controllers/user-controller");
require("dotenv").config();

/**
 * User signup. Email must be unique!
 */
router.post("/signup", userController.userSignup);

/**
 * Login, and if successful respond with a JWT + user info
 */
router.post("/login", userController.userLogin);

/**
 * This method can be used to update the "favoriteListings" of a user
 */
router.patch("/edit", authentication, userController.userEdit);

/**
 * Adds a single listing to the user's "favoriteListings" array
 */
router.patch(
  "/favorites/:listingId",
  authentication,
  userController.addFavoriteListing
);

/**
 * Deletes a single listing from the user's "favoriteListings" array
 */
router.delete(
  "/favorites/:listingId",
  authentication,
  userController.removeFavoriteListing
);

module.exports = router;
