const path = require("path");
const express = require("express");
const app = express();
const apiRouter = require("./api.js");
const module2 = require("express-endpoints-monitor");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(module2.gatherMetrics);

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./index.html"))
);

app.use("/api", apiRouter);

app.get("/fast", (req, res) => {
  res.status(201).send("fast");
});

app.put("/fast", (req, res) => {
  res.status(204).send("fast");
});

app.get("/slow", module2.registerEndpoint, (req, res) => {
  const validStatusCodes = [
    200, 200, 200, 202, 203, 204, 204, 210, 400, 401, 403, 500,
  ];
  const statusCode =
    validStatusCodes[Math.floor(Math.random() * validStatusCodes.length)];
  const artificialDelay = Math.random() * 110 + 95;
  setTimeout(() => res.status(statusCode).send("slow"), artificialDelay);
});

app.listen(PORT || 3000, () => {
  console.log(`Target server started on port ${PORT}`);

  // module2.exportEndpoints(app);
  module2.exportAllEndpoints(app);
  module2.startMetricsServer();
});
