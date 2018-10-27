import path from 'path'
import changeCase from 'change-case'
import { scripts } from 'require-external-programs'
import { bin } from 'require-external-programs-bin'
import { KEYWORD, KEYNAME, VERSION } from 'require-external-programs-lib'

describe('require-external-programs', () => {
  it('scripts', () => {
    expect(scripts).toEqual({
      install: require.resolve('require-external-programs/install')
    })
  })

  describe('package.json', () => {
    const manifest = require('require-external-programs/package.json')

    it('has scripts', () => {
      expect(manifest).toHaveProperty('scripts')
      expect(typeof manifest.scripts).toBe('object')
    })

    it('has scripts.install', () => {
      expect(manifest.scripts.install).toMatchSnapshot()
    })

    it('does not have bin', () => {
      expect(manifest).not.toHaveProperty('bin')
    })
  })
})

describe('require-external-programs-bin', () => {
  it('bin', () => {
    expect(bin).toBe(require.resolve('require-external-programs-bin/bin'))
  })

  describe('package.json', () => {
    const manifest = require('require-external-programs-bin/package.json')

    it('has bin', () => {
      expect(manifest).toHaveProperty('bin')
    })

    it(`has bin["${KEYWORD}"]`, async () => {
      expect(manifest.bin).toHaveProperty(KEYWORD)

      expect(path.resolve(
        path.dirname(require.resolve('require-external-programs-bin/package.json')),
        manifest.bin[KEYWORD]
      )).toBe(bin)
    })
  })
})

describe('require-external-programs-lib', () => {
  it('KEYWORD matches package name', () => {
    expect(KEYWORD).toBe('require-external-programs')
  })

  it('KEYNAME is lower camel case of KEYWORD', () => {
    expect(KEYNAME).toBe(changeCase.camel(KEYWORD))
  })

  it('VERSION to match require-external-programs/package.json/version', () => {
    expect(VERSION).toBe(
      require('require-external-programs/package.json').version
    )
  })
})
