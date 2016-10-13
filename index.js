'use strict'

const env = process.env.NODE_ENV || 'development'
const http = require('http')
const net = require('net')

const config = require('./config')
const logger = config.get('logger')

const server = http.createServer().listen(5050, () => {
  logger.info('listening on port 5050')
})

server.on('request', (req, res) => {

  // debugging
  logger.info('req.headers', req.headers)

  // Dashboard HTML
  res.writeHead(200, {'Content-Type': 'text/html'})
  const indexHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="refresh" content="5">
      <title>Hello World</title>
      <style>
      body {
          background-color: red;
      }
      </style>
    </head>
    <body>
      Hello World
    </body>
    </html>`
  return res.end(indexHtml)
})

process.on('uncaughtException', function (err) {
  // TODO:rudijs metric for monitoring and alerting
  logger.error(Error('uncaughtException'))
  logger.error(err)

  // after logging exit/crash - openshift will restart
  process.exit(1)
})
