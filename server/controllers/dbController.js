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
    |> filter(fn: (r) => r["path"] == "/good")`
    
    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            data.respTimeLineData.push({"x": o._time, "y": o._value})
        },
        error(error) {
            console.log('Query Finished ERROR');
            return next(error);
        },
        complete() {
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
    |> filter(fn: (r) => r["path"] == "/good")
    |> histogram(bins : linearBins(start: 0.0, width: 50.0, count: 6), normalize: false)`
    
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
                data.respTimeHistData.push({"x": le[i], "y": newResFreq[i]})
            }
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
    |> filter(fn: (r) => r["path"] == "/good")
    |> aggregateWindow(every: 1m, fn: count, createEmpty: false)`
    
    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            data.reqFreqLineData.push({"x": o._time, "y": o._value})
        },
        error(error) {
            console.log('Query Finished ERROR');
            return next(error);
        },
        complete() {
            res.locals.data = data;
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

dbController.getStatusPieData = (req, res, next) => {
    // labels: status codes
    // data: aggregated to be the count of status codes
    const influxQuery = 
    `from(bucket: "dev-bucket") 
    |> range(start: -6h)
    |> filter(fn: (r) => r["_measurement"] == "metrics")
    |> filter(fn: (r) => r["_field"] == "status_code")
    |> filter(fn: (r) => r["method"] == "GET")
    |> filter(fn: (r) => r["path"] == "/good")
    |> group(columns: ["_value"])
    |> count(column: "_field")
    |> group()`
    
    // declare a stats object to collect labels and data
    queryApi.queryRows(influxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            data.statusPieData.push({"x": o._value, "y": o._field})
        },
        error(error) {
            console.log('Query Finished ERROR');
            return next(error);
        },
        complete() {
            res.locals.data = data;
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

module.exports = dbController;