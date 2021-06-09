const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

module.exports = router;
