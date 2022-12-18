const express = require("express");
const app = express();
const PORT = 3000;
const fetch = require("node-fetch");
const listEndPoints = require("express-list-endpoints");
const responseTime = require("response-time");
// const {
//   startMetricsServer,
//   restResponseTimeHistogram,
//   restCounter,
// } = require("./metrics.js");
const log = [];
const module2 = require("./index.js");

app.use(express.json());
// Inject response time; response time will send metrics to Histogram

// ? Should be included in our package
app.use(
  responseTime((req, res, time) => {
    if (req.url) {
      log.push({
        date_created: new Date(),
        path: req.url,
        method: req.method,
        status_code: res.statusCode,
        response_time: Number(time.toFixed(3))
      });
      console.log(log[log.length - 1]);
    }
  })
);

app.get("/fast", (req, res) => {
  res.status(201).send("fast");
});

app.get("/slow", (req, res) => {
  setTimeout(() => res.status(200).send("slow"), Math.random() * 200 + 50);
});

app.patch(
  "/good",
  function customMiddleware(req, res, next) {
    return next();
  },
  (req, res) => {
    return res.sendStatus(202);
  }
);

app.get("/good", (req, res) => {
  const statusCode = Math.floor(Math.random() * 200 + 200);
  console.log(statusCode);
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

app.use("/allroutes", (req, res) => res.json(allroutes));

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

let allroutes;

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);

  // ? Should be included in our package
  allroutes = listEndPoints(app);
  module2.startMetricsServer();

});
