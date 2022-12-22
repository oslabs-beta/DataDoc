const path = require("path");
require("dotenv").config({path: path.resolve(__dirname, "../.env")});
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");
const db = require("./models/database.js");
const { Point } = require("@influxdata/influxdb-client")

// require router
const chartRouter = require('./routes/chartdata');
const dbController = require("./controllers/dbController");

const MODE = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 9990;

app.use(express.json());
app.use(cors());

if (MODE === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

// routing all /chartdata endpoint traffic to chartRouter
app.use('/chartdata', chartRouter);

let intervalId;
let logs = [];
let selectedEndpoints = [];

const scrapeDataFromMetricsServer = async () => {
  try {
    const metricsServerResponse = await fetch("http://localhost:9991/metrics");
    logs = await metricsServerResponse.json();
    // console.clear();
    // console.log(new Date().toUTCString(), '\n', 'LAST LOG:\n', logs[logs.length - 1], logs.length);
    // console.log(logs);
    storeLogsToDatabase(logs);
    return logs;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const storeLogsToDatabase = async (logsArr) => {
  try {
    const pointsArr = logsArr.map((log) => {
      return new Point("metrics")
        .tag("path", log.path)
        .tag("url", log.url)
        .tag("method", log.method)
        .floatField("res_time", log.response_time)
        .intField("status_code", log.status_code)
        .timestamp((new Date(log.date_created)).getTime());
      }
    );
    return db.insertMultiple(pointsArr);
  } catch (e) {
    return false;
  }
};

const pingTargetEndpoints = async () => {
  for (endpoint of selectedEndpoints) {
    try {
      await fetch('http://localhost:3000' + endpoint.path, 
      {
        method: endpoint.method
      });
    }
    catch (e) {

    }
    // console.log(endpoint.path, endpoint.method);
  }
}

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

app.get("/linechart/:id", (req, res) => {
  return res.status(200).json({
    0: 2,
    1: 6,
    2: 3,
    3: 2,
    4: 1,
    5: 0,
  });
});

app.post("/monitoring", async (req, res) => {
  const { active, interval } = req.body; // active is a boolean, interval is in seconds
  if (active) {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      pingTargetEndpoints();
      scrapeDataFromMetricsServer()
    }, interval * 1000);
  }
  else clearInterval(intervalId);
  console.log("ACTIVE:", active);
  res.sendStatus(204);
});

app.get("/metrics", async (req, res) => {
  return res.status(200).json(logs);
});

app.get("/routes", async (req, res) => {
  const response = await fetch("http://localhost:9991/endpoints");
  const routes = await response.json();
  // ! TO BE REMOVED: hard code status code 200
  routes.forEach((route) => {
    route.status = 200;
  });
  return res.status(200).json(routes);
});

app.post("/routes", async (req, res) => {
  selectedEndpoints = req.body.routes || req.body;
  return res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(
    `Application server started on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
