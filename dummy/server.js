const express = require("express");
const app = express();
const PORT = 3000;
const fetch = require("node-fetch");
const listEndPoints = require("express-list-endpoints");
const responseTime = require("response-time");
const {
  startMetricsServer,
  restResponseTimeHistogram,
  restCounter,
} = require("./metrics.js");

app.use(express.json());
// Inject response time; response time will send metrics to Histogram
app.use(
  responseTime((req, res, time) => {
    if (req.url) {
      // Print the response time
      console.log(`${new Date().toUTCString()}\npath: ${req.url}\ntime: ${time.toFixed(3)} ms`);

      // restResponseTimeHistogram.observe({
      //   method: req.method,
      //   route: req.url,
      //   status_code: res.statusCode
      // }, time / 1000)

      // Increment the appropriate counter
      restCounter.inc();
    }
  })
);

app.use(require("api-express-exporter")());

app.get("/fast", (req, res) => {
  res.status(200).send("fast");
});

app.get("/slow", (req, res) => {
  setTimeout(() => res.status(200).send("slow"), 1000);
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

app.get("/good",
  (req, res) => {
    return res.sendStatus(200);
  }
)

app.post("/bad", (req, res) => {
  return res.sendStatus(505);
});

app.delete("/error", (req, res) => {
  try {
    throw new Error("something broke...");
  } catch (error) {
    res.status(506).send(error);
  }
});

app.use("/allroutes", (req, res) => res.json(allroutes));

app.get(
  "/someotherroute",
  (req, res, next) => {
    fetch("https://google.com");
    // .then((fetchResponse) => fetchResponse.text())
    // .then((responseText) => console.log(responseText));
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
  startMetricsServer(9992);
  allroutes = listEndPoints(app);
});
