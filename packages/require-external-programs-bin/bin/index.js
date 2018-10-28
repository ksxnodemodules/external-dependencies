#! /usr/bin/env node
const process = require('process')
const { execute } = require('require-external-programs-utils')

execute(
  process.env.INIT_CWD,
  error => console.error(error),
  status => process.exit(status)
)
