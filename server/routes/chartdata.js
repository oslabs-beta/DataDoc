const express = require("express");
const compression = require("compression");
const dbController = require("../controllers/dbController");

const router = express.Router();
router.use(compression());

// get line chart data
router.get(
  "/",
  dbController.getRespTimeLineData,
  dbController.getRespTimeHistData,
  dbController.getReqFreqLineData,
  dbController.getStatusPieData,
  (req, res) => {
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;
