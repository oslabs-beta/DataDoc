const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
require("dotenv").config();

const MODE = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 9990;

app.use(express.json());

if (MODE === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

app.get("/metrics", async (req, res) => {
  const text = await (await fetch("http://localhost:9991/metrics")).text;
  console.log(text);
  return res.status(200).send("successsss");
});

app.listen(PORT, () => {
  console.log(
    `Express server listening on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
