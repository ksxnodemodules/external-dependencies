import changeCase from 'change-case'
import { scripts } from 'require-external-programs'
import { bin } from 'require-external-programs-bin'
import { KEYWORD, KEYNAME } from 'require-external-programs-lib'

describe('require-external-programs', () => {
  it('scripts', () => {
    expect(scripts).toEqual({
      install: require.resolve('require-external-programs/install')
    })
  })
})

describe('require-external-programs-bin', () => {
  it('bin', () => {
    expect(bin).toBe(require.resolve('require-external-programs-bin/bin'))
  })
})

describe('require-external-programs-lib', () => {
  it('KEYWORD matches package name', () => {
    expect(KEYWORD).toBe('require-external-programs')
  })

  it('KEYNAME is lower camel case of KEYWORD', () => {
    expect(KEYNAME).toBe(changeCase.camel(KEYWORD))
  })
})
