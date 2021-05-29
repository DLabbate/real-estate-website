// const http = require("http");
// const app = require("./app.js");

// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);

// Express
const express = require("express");
const app = express();

// Mongoose
const mongoose = require("mongoose");

// Routes
const listingRoutes = require("./routes/listings");
const userRoutes = require("./routes/users");

// Environment variables
require("dotenv").config();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
const port = process.env.PORT || 3000;

// Connect to MongoDB with the connection string
mongoose.connect(DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;

// Use JSON
app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).json({});
});

// Use routes
app.use("/listings", listingRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
