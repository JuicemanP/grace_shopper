require("dotenv").config();

const { client } = require("./db/client");
const express = require("express");
const server = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

const apiRouter = require("./api");
const { getAllUsers } = require("./db/user");

server.use(cors());
server.use(express.json());

server.use(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split("")[1]
    : null;

  if (!token) {
    return next();
  }
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const user = await getAllUsers(decodedToken.username);
  delete user.password;
  req.user = user;
  return next();
});
server.use("/api", apiRouter);

server.listen(process.env.PORT || 3001, () => {
  client.connect();
  console.log("The server is up on port");
});
