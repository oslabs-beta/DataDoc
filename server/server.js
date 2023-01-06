const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const db = require("./models/database.js");
const chartRouter = require("./routes/chartdata");
const { Point } = require("@influxdata/influxdb-client");
const { url } = require("inspector");
const pg = require("../database/pg.js");

const MODE = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || 9990;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

if (MODE === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

// * Route all /chartdata requests to chartRouter
app.use("/chartdata", chartRouter);

let intervalId;
let logs = [];
let selectedEndpoints = [];
let monitoringStartTime, monitoringEndTime, timeElapsed;

const updateTimeElapsed = function () {
  monitoringEndTime = new Date();
  timeElapsed = new Date(monitoringEndTime - monitoringStartTime);
  if (timeElapsed < 60 * 1000) return timeElapsed.getSeconds() + "s";
  return timeElapsed.getMinutes() + "m" + (timeElapsed.getSeconds() % 60) + "s";
};

const scrapeDataFromMetricsServer = async () => {
  try {
    const metricsServerResponse = await fetch("http://localhost:9991/metrics", {
      method: "DELETE",
    });
    logs = await metricsServerResponse.json();
    storeLogsToDatabase(logs);
    return logs;
  } catch (e) {
    console.error(e);
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
        .timestamp(new Date(log.date_created).getTime());
    });
    return db.insertMultiple(pointsArr);
  } catch (e) {
    console.error(e);
    return false;
  }
};

const pingTargetEndpoints = async () => {
  for (endpoint of selectedEndpoints) {
    try {
      await fetch("http://localhost:3000" + endpoint.path, {
        method: endpoint.method,
        headers: {
          'Cache-Control': 'no-cache', 
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
};

// endpoint to register user email and status codes to database
app.post("/registration", (req, res, next) => {
  let {subscribers, status300, status400, status500 } = req.body;
  try {
    const point = new Point('registration')
      .tag('email', subscribers)
      .booleanField('300', status300)
      .booleanField('400', status400)
      .booleanField('500', status500)
    db.insertRegistration(point);
    return next();
  } catch (e) {
    console.error(e);
  }},
  (req, res) => res.sendStatus(200))

app.post("/monitoring", async (req, res) => {
  // * active is a boolean, interval is in seconds
  let { active, interval, verbose } = req.body;
  if (active) {
    // * Enforce a minimum interval
    interval = interval < 0.5 ? 0.5 : interval;
    if (intervalId) clearInterval(intervalId);
    monitoringStartTime = new Date();
    intervalId = setInterval(() => {
      const timeElapsedString = updateTimeElapsed();
      if (verbose) {
        console.clear();
        console.log(`Monitoring for ${timeElapsedString}`);
      }
      pingTargetEndpoints();
      scrapeDataFromMetricsServer();
    }, interval * 1000);
  } else clearInterval(intervalId);
  if (verbose) console.log("ACTIVE:", active);
  res.sendStatus(204);
});


const pingOneEndpoint = async (path) => {
  try {
    await fetch("http://localhost:3000" + path, {
      method: "GET",
      headers: {
        'Cache-Control': 'no-cache', 
      }
    });
  } catch (e) {
    console.error(e);
  }
}

const performRPS= async (path, RPS) => {
  const interval = Math.floor(1000/RPS)
  if (intervalId) clearInterval(intervalId)
  // let counter = 0;
  intervalId = setInterval(() => {
  pingOneEndpoint(path)
 }, interval)
}

const rpswithInterval = async (path,RPS,timeInterval) => {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      performRPS(path,RPS)
      console.log("PING FINISHED")
    }, timeInterval * 1000);
  };


app.post("/simulation", async (req, res) => {
  console.log(req.body)
  const {RPS, timeInterval, setTime, stop, path} = req.body;
  if (!stop) {
    rpswithInterval(path,RPS,timeInterval)
  }
  else clearInterval(intervalId)
  console.log("PING RESULT DONE")
  return res.status(200).send("hi");
});



app.get ("/metrics", async (req, res) => {
  return res.status(200).json(logs);
});



app.get("/routes/server", async (req, res) => {
  const response = await fetch("http://localhost:9991/endpoints");
  const routes = await response.json();
  // ! TO BE REMOVED: hard code status code 200
  routes.forEach((route) => {
    route.status = 200;
    // route.tracking = true;
  });
  return res.status(200).json(routes);
});


app.get("/routes", async (req, res) => {
  const workspace_id = req.cookies?.workspace_id || 1;
  const queryText = `
    SELECT * 
    FROM endpoints
    WHERE workspace_id = $1;`
  const dbResponse = await pg.query(queryText, [workspace_id]);
  return res.status(200).json(dbResponse.rows);
});

app.post("/routes", async (req, res) => {
  let queryText = "";
  req.body.forEach((URI) => {
    queryText += `
      INSERT INTO endpoints (method, path, tracking, workspace_id) 
      VALUES ('${URI.method}', '${URI.path}', ${URI.tracking}, 1)
      ON CONFLICT ON CONSTRAINT endpoints_uq
      DO UPDATE SET tracking = ${URI.tracking};`
  })
  pg.query(queryText);
  selectedEndpoints = req.body.filter((URI) => URI.tracking) || req.body;
  return res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(
    `Application server started on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
