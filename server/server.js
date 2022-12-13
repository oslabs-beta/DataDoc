const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const parsePrometheusTextFormat = require("parse-prometheus-text-format");
const prom2Json = require("prom2json-se");
require("dotenv").config();

const MODE = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 9990;

app.use(express.json());

if (MODE === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

app.get("/metrics", async (req, res) => {
  const text = await (await fetch("http://localhost:9991/metrics")).text();
  const json = prom2Json.convert(text);
  console.log(prom2Json.convert(text));
  return res.status(200).json(json);
});

app.listen(PORT, () => {
  console.log(
    `Express server listening on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
