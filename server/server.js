const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const influxClient = require("./models/influx-client.js");
const { Point } = require("@influxdata/influxdb-client");
const chartRouter = require("./routes/chartdata");
const logRouter = require("./routes/logRouter.js");
const { url } = require("inspector");
const postgresClient = require("./models/postgres-client.js");
const { response } = require("express");
const { resolve } = require("path");
const {
  PhoneNumberContext,
} = require("twilio/lib/rest/lookups/v1/phoneNumber.js");

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
app.use("/logdata", logRouter);

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

const scrapeDataFromMetricsServer = async (metricsPort, tableName) => {
  try {
    logs = await (await fetch(`http://localhost:${metricsPort}/metrics`, { method: "DELETE" })).json()
    storeLogsToDatabase(logs, tableName);
    return logs;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const storeLogsToDatabase = async (logsArr, tableName) => {
  try {
    const pointsArr = logsArr.map((log) => {
      return new Point(tableName)
        .tag("path", log.path)
        .tag("url", log.url)
        .tag("method", log.method)
        .floatField("res_time", log.response_time)
        .intField("status_code", log.status_code)
        .timestamp(new Date(log.date_created).getTime());
    });
    return influxClient.insertMultiple(pointsArr);
  } catch (e) {
    console.error(e);
    return false;
  }
};

const pingTargetEndpoints = async () => {
  for (const endpoint of selectedEndpoints) {
    try {
      await fetch("http://localhost:3000" + endpoint.path, {
        method: endpoint.method,
        headers: { 'Cache-Control': 'no-store' }
      });
    } catch (e) {
      console.error(e);
    }
  }
};

// endpoint to register user email and status codes to database
app.post(
  "/registration",
  (req, res, next) => {
    let { subscribers, status300, status400, status500 } = req.body;
    try {
      const point = new Point("registration")
        .tag("email", subscribers)
        .booleanField("300", status300)
        .booleanField("400", status400)
        .booleanField("500", status500);
      influxClient.insertRegistration(point);
      return next();
    } catch (e) {
      console.error(e);
    }
  },
  (req, res) => res.sendStatus(200)
);

app.post("/monitoring", async (req, res) => {
  // * active is a boolean, interval is in seconds
  let { active, interval, verbose, metricsPort } = req.body;
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
      scrapeDataFromMetricsServer(metricsPort ,'monitoring');
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
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const performRPS = async (path, RPS) => {
  const interval = Math.floor(1000/RPS)
  if (intervalId) clearInterval(intervalId)
  let counter = 0;
  intervalId = setInterval(() => {
  pingOneEndpoint(path)
  counter ++
  console.log(counter)
 }, interval)
}

const rpswithInterval = async (path, RPS, timeInterval) => {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    performRPS(path, RPS);
    console.log("PING FINISHED");
  }, timeInterval * 1000);
};

app.post("/simulation", async (req, res) => {
  console.log(req.body)
  const {RPS, timeInterval, setTime, stop, path} = req.body;
  if (!stop) {
    rpswithInterval(path,RPS,timeInterval)
    scrapeDataFromMetricsServer('simulation')
  }
  else clearInterval(intervalId)
  console.log("PING RESULT DONE")
  return res.status(200).send("hi");
});

app.get ("/metrics", async (req, res) => {
  return res.status(200).json(logs);
});

app.get("/routes/server", async (req, res) => {
  const { metrics_port } = req.query
  console.log(metrics_port);
  const response = await fetch(`http://localhost:${metrics_port}/endpoints`);
  const routes = await response.json();
  // ! TO BE REMOVED: hard code status code 200
  routes.forEach((route) => {
    route.status = 200;
    route.tracking = false;
  });
  return res.status(200).json(routes);
});

app.get("/routes/:workspace_id", async (req, res) => {
  const { workspace_id } = req.params;
  const queryText = `
    SELECT * 
    FROM endpoints
    WHERE workspace_id = $1;`;
  const dbResponse = await postgresClient.query(queryText, [workspace_id]);
  return res.status(200).json(dbResponse.rows);
});

app.post("/routes/:workspace_id", async (req, res) => {
  const { workspace_id } = req.params;
  let queryText = "";
  req.body.forEach((URI) => {
    queryText += `
      INSERT INTO endpoints (method, path, tracking, workspace_id) 
      VALUES ('${URI.method}', '${URI.path}', ${URI.tracking}, ${workspace_id})
      ON CONFLICT ON CONSTRAINT endpoints_uq
      DO UPDATE SET tracking = ${URI.tracking};`;
  });
  postgresClient.query(queryText);
  selectedEndpoints = req.body.filter((URI) => URI.tracking) || req.body;
  return res.sendStatus(204);
});

//get existing workspaces for the user
app.get("/workspaces", async (req, res) => {
  // console.log('in /workspaces')
  const queryText = `
    SELECT * 
    FROM workspaces
    ;`;
  const dbResponse = await postgresClient.query(queryText);
  return res.status(200).json(dbResponse.rows);
});

//create a new workspace for the user
app.post("/workspaces", async (req, res) => {
  const { name, domain, port } = req.body;
  // console.log("THIS IS THE REQ BODY", domain, port);
  let queryText = `
  INSERT INTO workspaces(name, domain, port)
  VALUES ($1, $2, $3)`;
  postgresClient.query(queryText, [name, domain, port]);
  return res.sendStatus(204);
});

app.delete("/workspaces", async (req, res) => {
  const queryTextDelete = `SELECT * FROM workspaces WHERE name=$1`;
  const queryText = `DELETE FROM workspaces WHERE name=$1`;
  const name = [req.body.name];
  const deletedWorkspase = await postgresClient.query(queryTextDelete, [name]);
  const deletedResponse = await postgresClient.query(queryText, name);
  return res.status(200).json(deletedResponse.rows);
});

app.listen(PORT, () => {
  console.log(
    `Application server started on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
