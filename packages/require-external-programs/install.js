#! /usr/bin/env node

/*
  PROBLEM:
    In development mode, TypeScript files which this module is importing are not compiled,
    but `pnpm recursive install` always run this causing error to occurs

  SOLUTION:
    Try importing the files, ignore if it fails
*/

const jtry = require('just-try')

const executable = jtry(
  () => require('require-external-programs-bin').bin,
  () => false
)

// Errors come from `executable` must not be ignored
if (executable) require(executable)
