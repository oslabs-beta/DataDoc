const { InfluxDB, Point} = require('@influxdata/influxdb-client');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: path.resolve(__dirname, "../../.env")});

const ADMIN_TOKEN = process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN
const ORG = process.env.DB_INFLUXDB_INIT_ORG
const BUCKET = process.env.DB_INFLUXDB_INIT_BUCKET

// creates a new instance of influxDB
const client = new InfluxDB({url: 'http://localhost:8086', token: ADMIN_TOKEN})
// 
const writeApi = client.getWriteApi(ORG, BUCKET, 's')
const point = new Point('mem').floatField('used_percent', 50)

writeApi.useDefaultTags({host: 'host1'})
writeApi.writePoint(point)

writeApi
    .close()
    .then(() => {
        console.log('FINISHED')
    })
    .catch(e => {
        console.error(e)
        console.log('Finished ERROR')
    })

