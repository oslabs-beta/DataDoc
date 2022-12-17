const express = require("express");
const client = require("prom-client");
const fetch = require("node-fetch");

const app = express();

const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

const restCounter = new client.Counter({
  name: 'metric_name',
  help: 'metric_help',
  labelNames: ["method", "route", "status_code"],
});

module.exports = {
  restResponseTimeHistogram,
  restCounter,
  startMetricsServer: async function (PORT) {
    // const { collectDefaultMetrics } = client;
    // collectDefaultMetrics();

    const routes = await (await fetch('http://localhost:3000/allroutes')).json();
    console.log(routes.map((e) => e.path));

    app.get("/metrics", async (req, res) => {
      res.set("Content-Type", client.register.contentType);
      return res.send(await client.register.metrics());
    });
    app.listen(PORT, () => {
      console.log(`Metrics server started on port ${PORT}`);
    });
  },
};
