const express = require("express");
const fetch = require("node-fetch");
const responseTime = require("response-time");
const listAllEndpoints = require("express-list-endpoints");

const app = express();
let endpoints = [];
let logs = [];

module.exports = {

  logMetrics: responseTime((req, res, time) => {
    if (req.url) {
      logs.push({
        date_created: new Date(),
        path: req.route?.path,
        url: req.url,
        method: req.method,
        status_code: res.statusCode,
        response_time: Number(time.toFixed(3)),
      });
      console.log(logs[logs.length - 1]);
    }
  }),

  registerEndpoint: (req, res, next) => {
    return next();
  },

  exportAllEndpoints: (app) => {
    const registeredEndpoints = listAllEndpoints(app)
    const formattedEndpoints = [];
    for (const unformattedEndpoint of registeredEndpoints)
      for (const method of unformattedEndpoint.methods)
        formattedEndpoints.push({
          path: unformattedEndpoint.path,
          method: method
        })
    return endpoints = formattedEndpoints;
  },

  exportEndpoints: (app) => {
    const registeredEndpoints = listAllEndpoints(app).filter((endpoint) => endpoint.middlewares.includes("registerEndpoint"))
    const formattedEndpoints = [];
    for (const unformattedEndpoint of registeredEndpoints)
      for (const method of unformattedEndpoint.methods)
        formattedEndpoints.push({
          path: unformattedEndpoint.path,
          method: method
        })
    return endpoints = formattedEndpoints;
  },

  startMetricsServer: async function (PORT = 9991) {
    app.get("/metrics", async (req, res) => {});
    app.get("/endpoints", (req, res) => {
      return res.json(endpoints);
    });
    app.listen(PORT, () => {
      console.log(`Metrics server started on port ${PORT}`);
    });
  },

};
