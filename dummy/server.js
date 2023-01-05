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
    100, 102, 200, 200, 200, 202, 203, 204, 204, 210, 301, 302, 400, 401, 403, 404, 500, 505
  ];
  // for (let i = 100; i < 600; i += 2) {
  //   validStatusCodes.push(i)
  // }
  const statusCode =
    validStatusCodes[Math.floor(Math.random() * validStatusCodes.length)];
  const artificialDelay = Math.random() * 900;
  setTimeout(() => res.status(statusCode).send("slow"), artificialDelay);
});

app.listen(PORT || 3000, () => {
  console.log(`Target server started on port ${PORT}`);

  // module2.exportEndpoints(app);
  module2.exportAllEndpoints(app);
  module2.startMetricsServer();
});
