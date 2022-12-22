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
    'respTimeLineData': [],
    'respTimeHistData': [],
    'reqFreqLineData': [],
    'statusPieData': []
};

dbController.getRespTimeLineData = (req, res, next) => {

    const fluxQuery = 
    `from(bucket: "dev-bucket")
    |> range(start: -6h)
    |> filter(fn: (r) => r["_measurement"] == "metrics")
    |> filter(fn: (r) => r["_field"] == "res_time")
    |> filter(fn: (r) => r["method"] == "GET")
    |> filter(fn: (r) => r["path"] == "/slow")
    |> yield(name: "mean")`
    
    // declare a metrics object to collect labels and data
    const metrics = [];

    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            metrics.push({"x": o._time, "y": o._value})
        },
        error(error) {
            console.log('Query Finished ERROR');
            return next(error);
        },
        complete() {
            data.respTimeLineData = metrics;
            res.locals.data = data;
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

dbController.getRespTimeHistData = (req, res, next) => {

    const fluxQuery = 
    `from(bucket: "dev-bucket")
    |> range(start: -6h)
    |> filter(fn: (r) => r["_measurement"] == "metrics")
    |> filter(fn: (r) => r["_field"] == "res_time")
    |> filter(fn: (r) => r["method"] == "GET")
    |> filter(fn: (r) => r["path"] == "/slow")
    |> histogram(bins : linearBins(start: 0.0, width: 50.0, count: 6), normalize: false)`

    // declare a metrics object to collect labels and data
    const metrics = [];
    
    // declare a variable 'le' (lower than or equal to) and 'respFreq' to collect labels and data
    const le = [];
    const respFreq = [];

    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            le.push(o.le)
            respFreq.push(o._value)
        },
        error(error) {
            console.log('Query Finished ERROR');
            return next(error);
        },
        complete() {
            const newResFreq = respFreq.map((el, i) => {
                if (i === 0) return respFreq[i]
                return respFreq[i]-respFreq[i-1]
            })
            for (let i = 0; i < newResFreq.length; i++) {
                metrics.push({"x": le[i], "y": newResFreq[i]})
            }
            data.respTimeHistData = metrics;
            res.locals.data = data;
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

dbController.getReqFreqLineData = (req, res, next) => {
    
    const fluxQuery = 
    `from(bucket: "dev-bucket")
    |> range(start: -6h)
    |> filter(fn: (r) => r["_measurement"] == "metrics")
    |> filter(fn: (r) => r["_field"] == "res_time")
    |> filter(fn: (r) => r["method"] == "GET")
    |> filter(fn: (r) => r["path"] == "/slow")
    |> aggregateWindow(every: 1m, fn: count, createEmpty: false)`
    
    // declare a metrics object to collect labels and data
    const metrics = [];

    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            metrics.push({"x": o._time, "y": o._value})
        },
        error(error) {
            console.log('Query Finished ERROR');
            return next(error);
        },
        complete() {
            data.reqFreqLineData = metrics;
            res.locals.data = data;
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

dbController.getStatusPieData = (req, res, next) => {

    const influxQuery = 
    `from(bucket: "dev-bucket") 
    |> range(start: -6h)
    |> filter(fn: (r) => r["_measurement"] == "metrics")
    |> filter(fn: (r) => r["_field"] == "status_code")
    |> filter(fn: (r) => r["method"] == "GET")
    |> filter(fn: (r) => r["path"] == "/slow")
    |> group(columns: ["_value"])
    |> count(column: "_field")
    |> group()`

    // declare a metrics object to collect labels and data
    const metrics = [];
    
    // declare a stats object to collect labels and data
    queryApi.queryRows(influxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            metrics.push({"x": o._value, "y": o._field})
        },
        error(error) {
            console.log('Query Finished ERROR');
            return next(error);
        },
        complete() {
            data.statusPieData = metrics;
            res.locals.data = data;
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

module.exports = dbController;