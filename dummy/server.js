const path = require("path");
const express = require("express");
const app = express();
const apiRouter = require("./api.js");
const ourModule = require("express-endpoints-monitor");

const PORT = 3000;
const METRICS_PORT = 9991;

app.use(express.json());
app.use(ourModule.gatherMetrics);

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./index.html"))
);

app.use("/api", apiRouter);

app.get("/fast", 
ourModule.registerEndpoint,
(req, res) => {
  res.status(201).send("fast");
});

app.put("/fast", 
ourModule.registerEndpoint,
(req, res) => {
  res.status(204).send("fast");
});

app.get("/slow", ourModule.registerEndpoint, (req, res) => {
  const validStatusCodes = [
    100, 102, 200, 200, 200, 202, 203, 204, 204, 210, 301, 302, 400, 401, 403, 404, 500, 505
  ];

  const statusCode =
    validStatusCodes[Math.floor(Math.random() * validStatusCodes.length)];
  const artificialDelay = Math.random() * 900;
  setTimeout(() => res.status(statusCode).send("slow"), artificialDelay);
});

app.listen(PORT, () => {
  console.log(`Target server started on port ${PORT}`);
  
  // ourModule.exportEndpoints(app);
  ourModule.exportAllEndpoints(app);
  ourModule.startMetricsServer(METRICS_PORT);
});
