const express = require("express");
const app = express();
const PORT = 3001;
const fetch = require("node-fetch");
const listEndPoints = require("express-list-endpoints")
// const responseTime = require("response-time");
// const { startMetricsServer, restResponseTimeHistogram } = require("./metrics.js");

// // Inject response time; response time will send metrics to Histogram
// app.use(responseTime((req, res, time) => {
//   if (req.url) {
//     console.log('time:',time);
//     restResponseTimeHistogram.observe({
//       method: req.method,
//       route: req.url,
//       status_code: res.statusCode
//     }, time / 1000)
//   }
// }));
app.use(express.json());

app.use(require("api-express-exporter")()); // That's it!

app.get("/fast", (req, res) => {
  res.status(200).send("fast");
});

app.get("/slow", (req, res) => {
  setTimeout(() => res.status(200).send("slow"), 1000);
});

app.patch("/good", (req, res) => {
  return res.sendStatus(202);
});

app.use("/bad", (req, res) => {
  return res.sendStatus(505);
});

app.use("/error", (req, res) => {
  try {
    throw new Error("something broke...");
  } catch (error) {
    res.status(506).send(error);
  }
});

app.use("/allroutes", (req, res) => res.send(allroutes))

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

let allroutes = [];

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`);
  console.log(listEndPoints(app));
  allroutes = listEndPoints(app);
});
