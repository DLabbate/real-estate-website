// const http = require("http");
// const app = require("./app.js");

// const port = process.env.PORT || 3000;

// const server = http.createServer(app);

// server.listen(port);

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
