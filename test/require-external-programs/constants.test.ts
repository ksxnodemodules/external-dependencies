import { KEYWORD } from 'require-external-programs'

it('KEYWORD matches package name', () => {
  const { name } = require('require-external-programs/package.json')
  expect(KEYWORD).toBe(name)
})
