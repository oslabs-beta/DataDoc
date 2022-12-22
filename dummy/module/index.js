const express = require("express");
const responseTime = require("response-time");
const listAllEndpoints = require("express-list-endpoints");

/**
 * Start a new Express server that will store and serve a
 * list of logs and endpoints of the target server
 */
const app = express();

/**
 * Registed endpoints are stored in memory and can be exported 
 * through the /endpoints endpoint
 */
let endpoints = [];

/**
 * Logs are stored in memory until they are cleared by a request 
 * made to the DELETE /metrics endpoint
 */
let logs = [];

module.exports = {
  gatherMetrics: responseTime((req, res, time) => {
    if (req.url) {
      logs.push({
        date_created: new Date(),
        path: req.route?.path,
        url: req.url,
        method: req.method,
        status_code: res.statusCode,
        response_time: Number(time.toFixed(3)),
      });
    }
  }),

  registerEndpoint: (req, res, next) => {
    return next();
  },

  exportEndpoints: (app) => {
    const registeredEndpoints = listAllEndpoints(app).filter((endpoint) =>
      endpoint.middlewares.includes("registerEndpoint")
    );
    const formattedEndpoints = [];
    for (const unformattedEndpoint of registeredEndpoints)
      for (const method of unformattedEndpoint.methods)
        formattedEndpoints.push({
          path: unformattedEndpoint.path,
          method: method,
        });
    return (endpoints = formattedEndpoints);
  },

  exportAllEndpoints: (app) => {
    const registeredEndpoints = listAllEndpoints(app);
    const formattedEndpoints = [];
    for (const unformattedEndpoint of registeredEndpoints)
      for (const method of unformattedEndpoint.methods)
        formattedEndpoints.push({
          path: unformattedEndpoint.path,
          method: method,
        });
    return (endpoints = formattedEndpoints);
  },

  startMetricsServer: async function (PORT = 9991) {
    app.get("/metrics", (req, res) => {
      return res.status(200).json(logs);
    });
    app.delete("/metrics", (req, res) => {
      res.status(200).json(logs);
      logs = [];
      return;
    });
    app.get("/endpoints", (req, res) => {
      return res.json(endpoints);
    });
    app.listen(PORT, () => {
      console.log(`Metrics server started on port ${PORT}`);
    });
  },
};
