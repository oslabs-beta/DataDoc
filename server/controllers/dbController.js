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

dbController.getData = (req, res, next) => {
    // query
    // const fluxQuery =
    //     `from(bucket: "dev-bucket") |> range(start: -1h)`;
    const stats = {};
    const fluxQuery = 
        `from(bucket: "dev-bucket")
        |> range(start: -6h)
        |> filter(fn: (r) => r["_measurement"] == "metrics")
        |> filter(fn: (r) => r["_field"] == "status_code")
        |> filter(fn: (r) => r["method"] == "GET")
        |> filter(fn: (r) => r["path"] == "/good")
        |> yield(name: "mean")`

    queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            stats[o._time] = o._value;
            // console.log(`${o._time} ${o._measurement}: ${o._field}=${o._value}`);
        },
        error(error) {
            console.error(error);
            console.log('Query Finished ERROR');
        },
        complete() {
            res.locals.stats = stats;
            console.log('this is stats', res.locals.stats)
            console.log('Query Finished SUCCESS');
            return next();
        },
    });
};

module.exports = dbController;