<<<<<<< HEAD
module.exports = {
  ...require("./client"),
  ...require("./user"),
  ...require("./orders"),
  ...require("./product"),
};
=======
require("dotenv").config();

const { client } = require("./db/client");
const express = require("express");
const server = express();
const cors = require("cors");

const apiRouter = require("./api");

server.use(cors());
server.use(express.json());

server.use("/api", apiRouter);

server.listen(process.env.PORT || 3000, () => {
  client.connect();
  console.log("The server is up on port");
});
>>>>>>> 9ae3b9d599ae0eba12265894b2184337c4855a8d
