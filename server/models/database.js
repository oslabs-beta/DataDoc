const { InfluxDB, Point} = require('@influxdata/influxdb-client');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: path.resolve(__dirname, "../../.env")});

const token = process.env.DB_INFLUXDB_INIT_ADMIN_TOKEN
const org = process.env.DB_INFLUXDB_INIT_ORG
const bucket = process.env.DB_INFLUXDB_INIT_BUCKET

// create a new instance of influxDB, providing URL and API token
const client = new InfluxDB({url: 'http://localhost:8086', token: token})
// create a write client, providing influxDB organization and bucket name
const writeApi = client.getWriteApi(org, bucket, 's')
// create default tags to all points
writeApi.useDefaultTags({endpoint: '/signup'})

// 
const point = new Point('mem')
    .floatField('used_percent', 50)

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

