const express = require("express");
const compression = require("compression");
const influxController = require("../controllers/influxController.js");

const router = express.Router();
router.use(compression());

// * Retrieve line chart data from InfluxDB
router.get(
  "/",
  influxController.getRespTimeLineData,
  influxController.getRespTimeHistData,
  influxController.getReqFreqLineData,
  influxController.getStatusPieData,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

// * Update chart range
router.post("/", 
  influxController.updateRange,
  (req, res) => res.sendStatus(204)
)

module.exports = router;
