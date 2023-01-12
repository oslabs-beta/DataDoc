const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const influxClient = require("./models/influx-client.js");
const { Point } = require("@influxdata/influxdb-client");
const chartRouter = require("./routes/chartdata");
const logRouter = require("./routes/logRouter.js");
const postgresClient = require("./models/postgres-client.js");
const {
  PhoneNumberContext
} = require("twilio/lib/rest/lookups/v1/phoneNumber.js");
const pgController = require("./controllers/pgController.js");
const { query } = require("express");

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
let activeWorkspaceId;
let monitoringStartTime, monitoringEndTime, timeElapsed;
const trackedWorkspaces = {};

const updateTimeElapsed = function () {
  monitoringEndTime = new Date();
  timeElapsed = new Date(monitoringEndTime - monitoringStartTime);
  if (timeElapsed < 60 * 1000) return timeElapsed.getSeconds() + "s";
  return timeElapsed.getMinutes() + "m" + (timeElapsed.getSeconds() % 60) + "s";
};

const timeSince = (startDate) => {
  const timeElapsed = new Date(new Date() - startDate)
  if (timeElapsed < 60 * 1000) return timeElapsed.getSeconds() + "s";
  return timeElapsed.getMinutes() + "m" + (timeElapsed.getSeconds() % 60) + "s";
}

const scrapeDataFromMetricsServer = async (metricsPort, tableName) => {
  try {
    logs = await (
      await fetch(`http://localhost:${metricsPort}/metrics`, {
        method: "DELETE"
      })
    ).json();
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

const getTrackedEndpointsByWorkspaceId = async (workspaceId) => {
  const queryText = `
    SELECT * 
    FROM endpoints 
    WHERE 
      workspace_id=${workspaceId} AND 
      tracking=${true}
  ;`
  const dbResponse = await postgresClient.query(queryText);
  return dbResponse.rows;
}

const pingEndpoints = async (domain, port, endpoints = []) => {
  console.log("NEW", domain, port);
  const formattedPort = (port !== undefined && 0 < port && port < 9999) ? ':' + port : '';
  for (const endpoint of endpoints) {
    try {
      await fetch(`http://${domain}${formattedPort}${endpoint.path}`, {
        method: endpoint.method,
        headers: { "Cache-Control": "no-store" }
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

app.get("/monitoring/:workspaceId", 
  (req, res) => {
    const {workspaceId} = req.params;
    return res.status(200).json(trackedWorkspaces[workspaceId]?.active || false)
  }
);

app.post("/monitoring", async (req, res) => {
  // * active is a boolean, interval is in seconds
  const { active, domain, metricsPort, mode, port, verbose, workspaceId } = req.body;
  
  if (active) {
    // * Enforce a minimum interval
    let interval = Math.max(0.5, req.body.interval);
    if (trackedWorkspaces[workspaceId] === undefined) trackedWorkspaces[workspaceId] = {};
    if (trackedWorkspaces[workspaceId].intervalId) clearInterval(intervalId);
    const start = new Date();
    const endpoints = await getTrackedEndpointsByWorkspaceId(workspaceId) || [];
    Object.assign(trackedWorkspaces[workspaceId], {
      active,
      interval,
      intervalId: setInterval(() => {
        const elapsed = timeSince(trackedWorkspaces[workspaceId].start || new Date());
        trackedWorkspaces[workspaceId].elapsed = elapsed;
        if (verbose) {
          console.clear();
          console.log(`Monitoring for ${elapsed}`);
        }
        pingEndpoints(domain, port || '', endpoints);
        scrapeDataFromMetricsServer(metricsPort || 9991, `${mode}_${workspaceId}`);
      }, interval * 1000),
      domain,
      endpoints,
      metricsPort,
      mode,
      port,
      start,
      end: null,
      elapsed: 0,
    })
  } 
  
  else {
    if (trackedWorkspaces[workspaceId]) {
      clearInterval(trackedWorkspaces[workspaceId]?.intervalId)
      trackedWorkspaces[workspaceId].active = false;
    }
    Object.assign(trackedWorkspaces[workspaceId], {
      active,
      intervalId: null,
      endpoints: [],
      end: new Date(),
    })
  };

  if (verbose) {
    console.clear();
    console.log(`ACTIVE: ${active}`);
  }
    
  res.sendStatus(204);
});

const pingOneEndpoint = async (path) => {
  try {
    await fetch("http://localhost:3000" + path, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache"
      }
    });
  } catch (e) {
    console.error(e);
  }
};

const performRPS = async (path, RPS) => {
  const interval = Math.floor(1000 / RPS);
  if (intervalId) clearInterval(intervalId);
  let counter = 0;
  intervalId = setInterval(() => {
    pingOneEndpoint(path);
    counter++;
    console.log(counter);
  }, interval);
};

const rpswithInterval = async (path, RPS, timeInterval) => {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    performRPS(path, RPS);
    console.log("PING FINISHED");
  }, timeInterval * 1000);
};

app.post("/simulation", async (req, res) => {
  // console.log(req.body);
  const { RPS, timeInterval, setTime, stop, path } = req.body;
  if (!stop) {
    rpswithInterval(path, RPS, timeInterval);
    scrapeDataFromMetricsServer("simulation");
  } else clearInterval(intervalId);
  console.log("PING RESULT DONE");
  return res.status(200).send("hi");
});

app.get("/metrics", async (req, res) => {
  return res.status(200).json(logs);
});

app.put("/endpoints/:_id",
  pgController.updateEndpointById,
  (req, res) => {
    return res.sendStatus(204);
  }
)

app.put("/endpoints2/",
  pgController.updateEndpointByRoute,
  (req, res) => {
    return res.sendStatus(204);
  }
)

app.put("/routes/server", async (req, res, next) => {
  const { workspaceId, metricsPort } = req.body;
  try {
    res.locals.workspaceId = workspaceId;
    const response = await fetch(`http://localhost:${metricsPort}/endpoints`)
    const routes = await response.json();
    let queryText = `
      DELETE
      FROM endpoints
      WHERE workspace_id=${workspaceId}
    ;`;
    routes.forEach((route) => {
      // route.status = 200;
      route.tracking = false;
      queryText += `
        INSERT INTO endpoints (method, path, tracking, workspace_id) 
        VALUES ('${route.method}', '${route.path}', ${route.tracking}, ${workspaceId})
        ON CONFLICT ON CONSTRAINT endpoints_uq
        DO UPDATE SET tracking = ${route.tracking};
      `;
    });
    await postgresClient.query(queryText);
  }
  catch (err) {
    return console.error(err);
  }
  let dbResponse = [];
  try {
    queryText = `
      SELECT *
      FROM endpoints
      WHERE workspace_id=${workspaceId}
    ;`;
    dbResponse = (await postgresClient.query(queryText)).rows;
  }
  catch (err) {
    console.error(err);
    return next(err);
  }
  return res.status(200).json(dbResponse);
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

// get existing workspaces for the user
app.get("/workspaces", async (req, res) => {
  const queryText = `
    SELECT * 
    FROM workspaces
  ;`;
  const dbResponse = await postgresClient.query(queryText);
  return res.status(200).json(dbResponse.rows);
});

// create a new workspace for the user
app.post("/workspaces", async (req, res) => {
  const { name, domain, port, metricsPort } = req.body;
  let queryText = `
    INSERT INTO workspaces (name, domain, port, metrics_port)
    VALUES ($1, $2, $3, $4)
  ;`;
  postgresClient.query(queryText, [name, domain, port, metricsPort]);
  return res.sendStatus(204);
});

app.delete("/workspaces", async (req, res) => {
  const { workspace_id } = req.body;
  const queryText = `
    DELETE FROM workspaces 
    WHERE _id=${workspace_id}
  ;`;
  await postgresClient.query(queryText);
  return res.sendStatus(204);
});

app.delete("/endpoints/:workspaceId",
  pgController.deleteEndpointsByWorkspaceId,
  async (req, res) => {
    return res.sendStatus(204);
  }
);

app.listen(PORT, () => {
  console.log(
    `Application server started on port ${PORT}\n${MODE.toUpperCase()} mode`
  );
});
