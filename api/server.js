const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const glob = require('glob')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

/** Environment File */
require('dotenv').config({ path: path.join(__dirname, '../config/.env') })

/** Database Connection */
require('./database')

/** Helmet Security */
app.use(helmet())

/** Parser of JSON format with encoded */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/** REST API Routes application */
const routesPath = './app/routes/*.route.js'
glob(routesPath, function (error, files) {
  if (error) throw new Error('Error loading routes files of server.')
  if (files.length === 0) throw new Error('Files not found.')
  console.log('Loading app routes from %s', routesPath)
  files.forEach((file) => require(file)(app))
  console.log('Server: 🚀 GO!')
})

/** Cors Policy */
const allowedOrigins = [
  process.env.CORS_ORIGIN_CLIENT_HOST
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Request origin host not allowed by CORS policy.'), false)
    }
    return callback(null, true);
  },
  credentials: true
}))

/** Creating and running API Server */
const server = app.listen(process.env.SERVER_PORT, process.env.HOST, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('Welcome to %s', process.env.APP_NAME)
  console.log('API Server Running on http://%s:%s', host, port)
})