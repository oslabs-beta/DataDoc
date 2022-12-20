const { InfluxDB } = require('@influxdata/influxdb-client');
const dotenv = require('dotenv');
const path = require('path');
const db = require('../models/database');

const token = process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN;
const org = process.env.DB_INFLUXDB_INIT_ORG;
const bucket = process.env.DB_INFLUXDB_INIT_BUCKET;

const queryApi = new InfluxDB({url: 'http://localhost:8086', token: token}).getQueryApi(org);

const dbController = {};

const range = '12h';

// declare a data object to store chart data
const data = {
    'respTimeLineData': {},
    'respTimeHistData': { 'labels': [], 'data': []},
    'reqFreqLineData': { 'labels': [], 'data': []},
    'statusPieData': { 'labels': [], 'data': []}
};

dbController.getRespTimeLineData = (req, res, next) => {
    // query
    // const fluxQuery =
    //     `from(bucket: "dev-bucket") |> range(start: -1h)`;
    const fluxQuery = 
    `from(bucket: "dev-bucket")
    |> range(start: -6h)
    |> filter(fn: (r) => r["_measurement"] == "metrics")
    |> filter(fn: (r) => r["_field"] == "res_time")
    |> filter(fn: (r) => r["method"] == "GET")
    |> filter(fn: (r) => r["path"] == "/good")
    |> yield(name: "mean")`
    
    // declare a stats object to collect labels and data
    const stats = {'labels': [], 'data': []};
    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            stats["labels"].push(o._time)
            stats["data"].push(o._value)
            // stats[o._time] = o._value;
            // console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`);
        },
        error(error) {
            console.error(error);
            console.log('Query Finished ERROR');
        },
        complete() {
            data.respTimeLineData = stats;
            res.locals.data = data;
            console.log('this is stats', res.locals.data)
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

dbController.getRespTimeHistData = (req, res, next) => {

    // set res.locals.data.respTimeHistData
    data.respTimeHistData = {'label':'this is hist'}
    res.locals.data = data;
    return next()
}

dbController.getReqFreqLineData = (req, res, next) => {

    // set res.locals.data.reqFreqLineData
    data.reqFreqLineData = {'label':'this is freq line'}
    res.locals.data = data;
    return next()
}

dbController.getStatusPieData = (req, res, next) => {

    // set res.locals.data.reqFreqLineData
    data.statusPieData = {'label':'this is pie'}
    res.locals.data = data;
    return next()
}


module.exports = dbController;