const userService = require("../services/user-service");
require("dotenv").config();

exports.userSignup = async (req, res, net) => {
  try {
    const userData = req.body;

    // First check if the email already exists
    let user = await userService.getUserByEmail(userData.email);

    if (user) {
      // If a user already exists, return an error
      console.log(`Email ${userData.email} already exists!`);
      return res
        .status(409)
        .json({ error: { message: "Email already exists!" } });
    } else {
      // Create a new user
      const newUser = await userService.createNewUser(userData);
      return res.status(201).json(newUser);
    }
  } catch (err) {
    console.log("Error with user signup", err);
    return res.status(500).json({ error: err });
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const userLoginData = req.body;

    let userSavedData = await userService.getUserByEmail(userLoginData.email);

    console.log(
      `Checking if user exists with email ${userLoginData.email}:`,
      userSavedData
    );
    if (!userSavedData) {
      // In this case, no user account is associated with the specified email
      console.log("No user account is associated with the specified email");
      return res.status(401).json({ error: { message: "Auth failed" } });
    }

    // Check if password is correct
    let result = await userService.validatePassword(
      userLoginData,
      userSavedData
    );

    if (!result) {
      console.log("Incorrect Password!");
      return res.status(401).json({ error: { message: "Auth failed" } });
    } else {
      // If we made it here --> Good Password!
      let token = await userService.getJWT(userSavedData);
      console.log("Correct Password!");

      // Format the user for the response
      let formattedUser = await userService.formatUser(userSavedData);
      return res.status(200).json({
        //message: "Auth successful",
        ...formattedUser,
        token: token,
      });
    }
  } catch (err) {
    console.log("Error with user login", err);
    return res.status(500).json({ error: err });
  }
};

exports.userEdit = async (req, res, next) => {
  try {
    // From JWT
    const userData = req.userData;
    console.log(req.userData);

    // From body
    const newUserData = req.body;
    console.log(newUserData);

    let updatedUserObject = await userService.editUserInfo(
      userData,
      newUserData
    );

    console.log("Successfully updated user");
    res.status(200).json(updatedUserObject);
  } catch (err) {
    console.log("Error with user edit", err);
    return res.status(500).json({ error: err });
  }
};

exports.addFavoriteListing = async (req, res, next) => {
  try {
    // From JWT
    const userData = req.userData;
    console.log(req.userData);

    const listingId = req.params.listingId;

    let updatedUserObject = await userService.addFavoriteListing(
      userData._id,
      listingId
    );
    console.log("Successfully added favoriteListing for user");
    res.status(200).json(updatedUserObject);
  } catch (err) {
    console.log("Error with adding listing to user favorites", err);
    return res.status(500).json({ error: err });
  }
};

exports.removeFavoriteListing = async (req, res, next) => {
  try {
    // From JWT
    const userData = req.userData;
    console.log(req.userData);

    const listingId = req.params.listingId;

    let updatedUserObject = await userService.removeFavoriteListing(
      userData._id,
      listingId
    );
    console.log("Successfully removed favoriteListing for user");
    res.status(200).json(updatedUserObject);
  } catch (err) {
    console.log("Error with removing listing from user favorites", err);
    return res.status(500).json({ error: err });
  }
};
