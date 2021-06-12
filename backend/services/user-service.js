const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/user-repository");
const noteRepository = require("../repositories/note-repository");
require("dotenv").config();

/**
 * Gets a user by email
 */
exports.getUserByEmail = async (userEmail) => {
  console.log(`Finding user with email: ${userEmail}`);
  let user = await userRepository.getUserByEmail(userEmail);

  if (user) {
    return user.toObject();
  }

  return null;
};

/**
 * Formats the user object to contain only relevant information.
 */
exports.formatUser = async (userObject) => {
  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

/**
 * Creates a new user
 */
exports.createNewUser = async (userData) => {
  const hash = await bcrypt.hash(userData.password, 10);

  const user = await userRepository.createNewUser(userData, hash);
  console.log("Successfully saved user with hashed password");

  let userObject = user.toObject();
  // Don't show hashed password in the response
  return await this.formatUser(userObject);
};

/**
 * Checks if a user's password matches the corresponding hash
 */
exports.validatePassword = async (userLoginData, userSavedData) => {
  // Check if password is correct
  let result = await bcrypt.compare(
    userLoginData.password,
    userSavedData.password
  );

  return result;
};

/**
 * Returns a JWT token holding the user's info
 */
exports.getJWT = async (userData) => {
  const token = jwt.sign(
    // Put user info inside the payload
    {
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      favoriteListings: userData.favoriteListings,
      phoneNumber: userData.phoneNumber,
      publishedListing: userData.publishedListing,
    },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );
  return token;
};

/**
 * Edit a user's info, such as "favoriteListings"
 */
exports.editUserInfo = async (oldUserData, newUserData) => {
  let updatedUser = await userRepository.editUserInfoById(
    oldUserData._id,
    newUserData
  );

  updatedUserObject = updatedUser.toObject();
  return await this.formatUser(updatedUserObject);
};

/**
 * Adds a single listing to the "favoriteListings" array of ONE user
 */
exports.addFavoriteListing = async (userId, listingId) => {
  let updatedUser = await userRepository.addFavoriteListing(userId, listingId);

  // A note will also be created for this user

  // First check if one already exists for the corresponding userId and listingId
  const note = await noteRepository.findNote(userId, listingId);

  if (!note) {
    await noteRepository.createNewNote(userId, listingId);
  }

  updatedUserObject = updatedUser.toObject();
  return await this.formatUser(updatedUserObject);
};

/**
 * Deletes a listing from a single user's favorites
 */
exports.removeFavoriteListing = async (userId, listingId) => {
  let updatedUser = await userRepository.removeFavoriteListing(
    userId,
    listingId
  );

  // The corresponding note must be removed
  await noteRepository.deleteNote(userId, listingId);

  updatedUserObject = updatedUser.toObject();
  return await this.formatUser(updatedUserObject);
};
