const express = require("express");
const app = express();
const PORT = 3000;
const fetch = require("node-fetch");
const module2 = require("express-endpoints-monitor");

app.use(express.json());
app.use(
  // ? Should be included in our package
  module2.gatherMetrics
);

app.get("/specific/:id", module2.registerEndpoint, (req, res) => {
  res.status(201).send("specific");
});

app.get("/routewithquery", module2.registerEndpoint, (req, res) => {
  res.status(201).send("query");
});

app.get("/fast", module2.registerEndpoint, (req, res) => {
  res.status(201).send("fast");
});

app.get("/slow", (req, res) => {
  setTimeout(() => res.status(200).send("slow"), Math.random() * 200 + 50);
});

app.patch(
  "/good",
  module2.registerEndpoint,
  function customMiddleware(req, res, next) {
    return next();
  },
  (req, res) => {
    return res.sendStatus(202);
  }
);

app.get("/good", module2.registerEndpoint, (req, res) => {
  const statusCode = Math.floor(Math.random() * 200 + 200);
  return res.sendStatus(statusCode);
});

app.get("/bad", (req, res) => {
  const statusCode = Math.floor(Math.random() * 200 + 400);
  return res.sendStatus(statusCode);
});

app.get("/error", (req, res) => {
  try {
    throw new Error("something broke...");
  } catch (error) {
    res.status(506).send(error);
  }
});

app.get("/arbitrarily/nested/route", (req, res) => res.sendStatus(200));

app.get(
  "/someotherroute",
  (req, res, next) => {
    fetch("https://google.com");
    return next();
  },
  (req, res) => {
    res.send();
  }
);

app.use("/", (req, res) => res.send("HELLO WORLD"));

app.listen(PORT, () => {
  console.log(`Target server started on port ${PORT}`);

  // ? Should be included in our package
  module2.exportEndpoints(app);
  // module2.exportAllEndpoints(app);
  module2.startMetricsServer();
});
