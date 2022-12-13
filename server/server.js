const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const MODE = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 9990;

app.use(express.json());

if (MODE === "production") {
  app.use("/", express.static(path.join(__dirname, "../dist")));
}

app.listen(PORT, () => {
  console.log(
    `Express server listening on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
