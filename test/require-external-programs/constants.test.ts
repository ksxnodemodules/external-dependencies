import changeCase from 'change-case'
import { KEYWORD, KEYNAME } from 'require-external-programs'

it('KEYWORD matches package name', () => {
  const { name } = require('require-external-programs/package.json')
  expect(KEYWORD).toBe(name)
})

it('KEYNAME is lower camel case of KEYWORD', () => {
  expect(KEYNAME).toBe(changeCase.camel(KEYWORD))
})
