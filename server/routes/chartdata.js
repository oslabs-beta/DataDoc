const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

// get line chart data
router.get('/linechart/:id',
    dbController.getRespTimeLineData,
    dbController.getRespTimeHistData,
    dbController.getReqFreqLineData,
    dbController.getStatusPieData,
    (req, res) => {
        return res.status(200).json(res.locals.data);
    });

module.exports = router;