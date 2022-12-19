const express = require("express");
const fetch = require("node-fetch");
const listAllEndpoints = require("express-list-endpoints");

const app = express();

let endpoints = [];

module.exports = {
  
  func: () => console.log('func'),

  registerAllEndpoints: (app) => {
    return endpoints = listAllEndpoints(app);
  },

  registerEndpoint: (req, res, next) => {
    const existingRoute = endpoints.find(e => e.path === req.url);
    if (existingRoute) {
      if (existingRoute.methods.includes(req.method)) {
        console.log('Endpoint already registered');
      }
      else (existingRoute.methods.push(req.method));
    }
    else (endpoints.push({
      path: req.route?.path,
      methods: [req.method],
    }))
    return next();
  },

  startMetricsServer: async function (PORT = 9991) {

    app.get("/metrics", async (req, res) => {
      res.set("Content-Type", client.register.contentType);
      return res.send(await client.register.metrics());
    });

    app.get("/endpoints", (req, res) => {
      return res.json(endpoints);
    });

    app.listen(PORT, () => {
      console.log(`Metrics server started on port ${PORT}`);
    });

  },
};
