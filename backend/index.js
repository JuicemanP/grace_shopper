const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  user: "postgres",
  password: process.env.POSTGRES_PASSWORD,
  database: "grace-shopper",
});

module.exports = client;
