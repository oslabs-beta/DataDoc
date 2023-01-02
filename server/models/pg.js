const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();
const { PG_URI } = process.env;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};