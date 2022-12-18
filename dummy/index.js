const express = require("express");
const fetch = require("node-fetch");
const listAllEndpoints = require("express-list-endpoints");

const app = express();

module.exports = {
  
  func: () => console.log('func'),

  startMetricsServer: async function (PORT = 9991) {
    const routes = await (await fetch('http://localhost:3000/allroutes')).json();
    console.log('Discovered:\n', routes.map((e) => e.path + ' ' + e.methods));

    app.get("/metrics", async (req, res) => {
      res.set("Content-Type", client.register.contentType);
      return res.send(await client.register.metrics());
    });

    app.listen(PORT, () => {
      console.log(`Metrics server started on port ${PORT}`);
    });

  },
};
