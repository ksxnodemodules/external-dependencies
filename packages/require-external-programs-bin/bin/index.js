#! /usr/bin/env node
const process = require('process')
const { execute } = require('require-external-programs-utils')

execute(
  process.cwd(),
  error => console.error(error),
  status => process.exit(status)
)
