import changeCase from 'change-case'
import { KEYWORD, KEYNAME } from 'require-external-programs-lib'

describe('require-external-programs-lib', () => {
  it('KEYWORD matches package name', () => {
    expect(KEYWORD).toBe('require-external-programs')
  })

  it('KEYNAME is lower camel case of KEYWORD', () => {
    expect(KEYNAME).toBe(changeCase.camel(KEYWORD))
  })
})
