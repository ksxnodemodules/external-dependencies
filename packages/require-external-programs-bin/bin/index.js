#! /usr/bin/env node
const process = require('process')
const { execute } = require('require-external-programs-utils')

process.chdir(process.env.INIT_CWD)

execute(
  '.',
  error => console.error(error),
  status => process.exit(status)
)
