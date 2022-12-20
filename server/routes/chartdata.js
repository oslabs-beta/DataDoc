const express = require('express');
const router = express.Router();
const dbController = require('../controllers/dbController');

// get line chart data
router.get('/linechart/:id',
    dbController.getData,
    (req, res) => {
        console.log('chart data', res.locals.stats)
        return res.status(200).json(res.locals.stats);
    });

// get line chart data
router.get('/linechart/:id')

// get pie chart data
router.get('/donutchart/:id')

// get histogram data
router.get('/histogram/:id')


module.exports = router;