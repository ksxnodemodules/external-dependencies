'use strict'

const {
  moduleFileExtensions,
  coveragePathIgnorePatterns
} = require('./lib/contants')

const packageJson = {
  displayName: 'validate',
  testRegex: 'package\\.json$',
  runner: require.resolve('./runners/package-json')
}

const test = {
  displayName: 'test',
  transform: {
    '\\.jsx?$': require.resolve('babel-jest'),
    '\\.tsx?$': require.resolve('ts-jest'),
    '\\.(yaml|yml)$': require.resolve('yaml-jest')
  },
  testRegex: '(test|spec|check)\\.(jsx?|tsx?)$',
  moduleFileExtensions,
  coveragePathIgnorePatterns
}

const projects = [
  packageJson,
  test
]

const globals = {
  'ts-jest': {
    diagnostics: false
  }
}

module.exports = { projects, globals }
