const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // e.g. `Bearer eyJhbGciOiJIUzI1NiIsInR5...`
    // We only want to extract the token eyJhbGciOiJIUzI1NiIsInR5...
    const token = req.headers.authorization.split(" ")[1];
    console.log("Received the following Bearer token: ", token);

    // Check that the token is valid
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("JWT data: ", decoded);

    // Get the user data from the token
    req.userData = decoded;
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Auth Failed" });
  }

  // If successful, continue
  next();
};
