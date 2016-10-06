'use strict'

// const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const nconf = require('nconf')
const bunyan = require('bunyan')

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
nconf.argv().env()

const logger = bunyan.createLogger({name: 'os-httpd'})

nconf.defaults({
  'logger': {
    'info': logger.info.bind(logger),
    'error': logger.error.bind(logger)
  }
})

module.exports = nconf
