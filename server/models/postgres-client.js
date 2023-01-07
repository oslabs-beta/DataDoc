const { Pool, Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const { PG_HOST, PG_PORT, PG_USER, PG_PASS, PG_DB } = process.env;

const client = new Client({
  host: PG_HOST,
  port: PG_PORT,
  user: PG_USER,
  password: PG_PASS,
  database: PG_DB,
})

client.connect().then(() => {
  console.log("Connected to database");
  client.query("SELECT NOW()");
})

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback);
  },
};