const express = require("express");
const app = express();
const PORT = 3000;
const fetch = require("node-fetch");
const module2 = require("express-endpoints-monitor");
const path = require("path");

app.use(express.json());
app.use(
  // ? Should be included in our package
  module2.gatherMetrics
);

app.get("/specific/:id", (req, res) => {
  res.status(201).send("specific");
});

app.get("/routewithquery", (req, res) => {
  res.status(201).send("query");
});

app.get("/fast", (req, res) => {
  res.status(201).send("fast");
});

app.get("/slow", 
  module2.registerEndpoint,
  (req, res) => {
    const validStatusCodes = [200, 202, 203, 204, 210, 400, 401, 403, 500]
    const statusCode = validStatusCodes[Math.floor(Math.random() * validStatusCodes.length)];
    const artificialDelay = Math.random() * 100 + 100;
    setTimeout(() => res.status(statusCode).send("slow"), artificialDelay);
  }
);

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

app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, './index.html'))
);

app.use("/", (req, res) => res.send("HELLO WORLD"));

app.listen(PORT, () => {
  console.log(`Target server started on port ${PORT}`);

  // ? Should be included in our package
  module2.exportEndpoints(app);
  // module2.exportAllEndpoints(app);
  module2.startMetricsServer();
});
