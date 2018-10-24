#! /usr/bin/env node
const process = require('process')
const { examine, ExitStatusCodes } = require('require-external-programs-utils')
const { Satisfied, Unsatisfied, CaughtException, UncaughtException } = ExitStatusCodes

examine(process.cwd()).then(
  result => {
    if (result.satisfied) return process.exit(Satisfied)
    if (!result.error) return process.exit(Unsatisfied)
    console.error(result.response)
    process.exit(CaughtException)
  },
  error => {
    console.error(error)
    process.exit(UncaughtException)
  }
)
