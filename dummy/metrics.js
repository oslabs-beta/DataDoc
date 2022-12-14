const express = require("express");
const client = require("prom-client");

const app = express();

const restResponseTimeHistogram = new client.Histogram({
  name: "rest_response_time_duration_seconds",
  help: "REST API response time in seconds",
  labelNames: ["method", "route", "status_code"],
});

module.exports = { 
  startMetricsServer: function () {
    const { collectDefaultMetrics } = client;
    collectDefaultMetrics();

    app.get("/metrics", async (req, res) => {
      res.set("Content-Type", client.register.contentType);
      return res.send(await client.register.metrics());
    });

    app.listen(3002, () => {
      console.log("Metrics server started on port 3001");
    });
  },
  restResponseTimeHistogram
}
