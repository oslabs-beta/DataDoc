const express = require("express");
const compression = require("compression");
const dbController = require("../controllers/dbController");

const router = express.Router();
router.use(compression());

// get line chart data
router.get(
  "/",
  dbController.getEndpointLogs,
  (req, res) => {
    console.log(res.locals.logs)
    return res.status(200).json(res.locals.logs);
  }
);

module.exports = router;
