const express = require("express");
const compression = require("compression");
const influxController = require("../controllers/influxController.js");

const router = express.Router();
router.use(compression());

// get line chart data
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

module.exports = router;
