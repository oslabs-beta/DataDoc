const express = require("express");
const fetch = require("node-fetch");
const listAllEndpoints = require("express-list-endpoints");

const app = express();
let endpoints = [];

module.exports = {

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
