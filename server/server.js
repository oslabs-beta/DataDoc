require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const fetch = require("node-fetch");
const prom2Json = require("prom2json-se");
const cors = require("cors");

const MODE = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 9990;

app.use(express.json());
app.use(cors());

if (MODE === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

let intervalId;
let promData;

const fetchDataFromPromServer = async (req, res) => {
  try {
    const promServerResponse = await fetch("http://localhost:9991/metrics");
    const { status } = promServerResponse;
    console.log(new Date().toUTCString(), status);
    promData = prom2Json.convert(await promServerResponse.text());
  } catch (err) {
    console.error(err);
  }
};

// app.get("/routes", (req, res) => {
//   res.status(200).json([
//     { endpoint: "route1", status: 200 },
//     { endpoint: "route2", status: 200 },
//     { endpoint: "route3", status: 200 },
//     { endpoint: "route4", status: 200 },
//   ]);
// });

app.get("/histogram", (req, res) => {
  return res.status(200).json({
    0: 2,
    0.1: 6,
    0.5: 3,
    1: 2,
    5: 1,
    10: 0,
  });
});

app.post("/monitoring", (req, res) => {
  const { active, interval } = req.body; // active is a boolean, interval is in seconds
  if (active)
    intervalId = setInterval(fetchDataFromPromServer, interval * 1000);
  else clearInterval(intervalId);
  console.log("ACTIVE:", active);
  res.sendStatus(200);
});

app.get("/metrics", async (req, res) => {
  return res.status(200).json(promData);
});

app.get("/routes", async (req, res) => {
  const response = await fetch('http://localhost:3001/allroutes');
  const routes = await response.json();
  // TO BE REMOVED: hard code status code 200
  routes.forEach((route) => {
    route.status = 200
  })
  return res.status(200).json(routes);
})

app.listen(PORT, () => {
  console.log(
    `Application server started on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
