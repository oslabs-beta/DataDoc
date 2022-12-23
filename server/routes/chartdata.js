const express = require("express");
const router = express.Router();
const dbController = require("../controllers/dbController");

// get line chart data
router.get(
  "/",
  dbController.getRespTimeLineData,
  dbController.getRespTimeHistData,
  dbController.getReqFreqLineData,
  dbController.getStatusPieData,
  (req, res) => {
    console.log("this is res.locals.data", res.locals.data);
    return res.status(200).json(res.locals.data);
  }
);

module.exports = router;
