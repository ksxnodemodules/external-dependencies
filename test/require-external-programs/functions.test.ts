import path from 'path'
import { readFile } from 'fs-extra'

import libDefaultExport, {
  fromAllManifests,
  allManifests,
  classifyManifestList,
  InvalidManifestError,
  KEYWORD,
  KEYNAME,
  ManifestContentList
} from 'require-external-programs-lib'

import utilsDefaultExport, {
  groupByManifest,
  groupByProgram,
  messageFromError,
  examine,
  execute,
  ExitStatusCodes
} from 'require-external-programs-utils'

import createVirtualEnvironment from './virtual-env'
const { apply } = createVirtualEnvironment()

import * as whichMockData from './__mocks__/which/data'

describe('require-external-programs-lib', () => {
  describe('default export', () => {
    it('is fromAllManifests', () => {
      expect(libDefaultExport).toBe(fromAllManifests)
    })
  })

  describe('fromAllManifests', () => {
    const getMap = async (...paths: string[]) =>
      new Map(await fromAllManifests(path.join(...paths)))

    it('works with valid data', apply(async () => {
      expect(await getMap('valid')).toMatchSnapshot()
    }))

    describe('throws error when received invalid data', () => {
      const mkfn = (...paths: string[]) => apply(async () => {
        await getMap(...paths).then(
          resolve => {
            console.error({ resolve })
            throw new Error('Expecting the promise to reject, but it resolves')
          },
          error => {
            if (error instanceof InvalidManifestError) {
              expect({
                error,
                map: new Map(error.map)
              }).toMatchSnapshot()

              return
            }

            throw new Error(`Expecting an InvalidManifestError but received ${error}`)
          }
        )
      })

      it(`whose "dependencies" and "devDependencies" lack "${KEYWORD}"`, mkfn('invalid', 'missing-field-in-dependency-dict'))
      it('which lacks both "dependencies" and "devDependencies', mkfn('invalid', 'lack-dependency-dicts'))
      it(`whose "${KEYNAME}" is not an array`, mkfn('invalid', 'not-an-array'))
      it('which is located in /invalid', mkfn('invalid'))
      it('which is located in /', mkfn())
    })
  })

  describe('allManifests', () => {
    it('lists all manifests', apply(async () => {
      expect(await allManifests('.')).toMatchSnapshot()
    }))
  })

  describe('classifyManifestList', () => {
    it('matches snapshot', apply(async () => {
      const files = await allManifests('.')

      const list: ManifestContentList = await Promise.all(
        files.map(async manifestPath => ({
          manifestPath,
          manifestContent: JSON.parse(await readFile(manifestPath, { encoding: 'utf8' }))
        }))
      )

      expect(classifyManifestList(list)).toMatchSnapshot()
    }))
  })
})

describe('require-external-programs-utils', () => {
  describe('default export', () => {
    expect(utilsDefaultExport).toBe(execute)
  })

  describe('examine', () => {
    it('when all is satisfied', apply(async () => {
      const { getParams } = whichMockData.mockSync(cmd => `/bin/${cmd}`)
      const result = await examine('valid')
      const params = getParams()
      whichMockData.restoreAll()

      expect(result).toMatchObject({ satisfied: true, error: false })
      expect(params).toMatchSnapshot()
    }))

    it('when all is not satisfied', apply(async () => {
      const { getParams } = whichMockData.mockSync(() => null)
      const result = await examine('valid')
      const params = getParams()
      whichMockData.restoreAll()

      expect(result).toMatchObject({ satisfied: false, error: false })
      expect(result).toMatchSnapshot()
      expect(params).toMatchSnapshot()
    }))

    it('when only some is satisfied', apply(async () => {
      const availables = ['abc', 'def']

      const { getParams } = whichMockData
        .mockSync(cmd => availables.includes(cmd) ? `/bin/${cmd}` : null)

      const result = await examine('valid')
      const params = getParams()
      whichMockData.restoreAll()

      expect(result).toMatchObject({ satisfied: false, error: false })
      expect(result).toMatchSnapshot()
      expect(params).toMatchSnapshot()
    }))

    it('when some manifest files are invalid', apply(async () => {
      whichMockData.mockSync(() => null)
      const result = await examine('.')
      whichMockData.restoreAll()

      expect(result).toMatchObject({ satisfied: false, error: true })
      expect(result).toMatchSnapshot()
    }))
  })

  describe('execute', () => {
    const mkfn = (dirname: string) => {
      const logParams = Array<any>()
      const exitParams = Array<ExitStatusCodes[]>()

      const fn = () => execute(
        dirname,
        (...args) => { logParams.push(args) },
        (...args) => { exitParams.push(args) }
      )

      const getParams = () => ({ logParams, exitParams })

      return { fn, getParams }
    }

    it('when all is satisfied', apply(async () => {
      whichMockData.mockSync(cmd => `/bin/${cmd}`)
      const { fn, getParams } = mkfn('valid')
      await fn()
      const params = getParams()
      whichMockData.restoreAll()

      expect(params.exitParams).toEqual([[ExitStatusCodes.Satisfied]])
      expect(params).toMatchSnapshot()
    }))

    it('when all is not satisfied', apply(async () => {
      whichMockData.mockSync(() => null)
      const { fn, getParams } = mkfn('valid')
      await fn()
      const params = getParams()
      whichMockData.restoreAll()

      expect(params.exitParams).toEqual([[ExitStatusCodes.Unsatisfied]])
      expect(params).toMatchSnapshot()
    }))

    it('when only some is satisfied', apply(async () => {
      const availables = ['abc', 'def']

      whichMockData
        .mockSync(cmd => availables.includes(cmd) ? `/bin/${cmd}` : null)

      const { fn, getParams } = mkfn('valid')
      await fn()
      const params = getParams()
      whichMockData.restoreAll()

      expect(params.exitParams).toEqual([[ExitStatusCodes.Unsatisfied]])
      expect(params).toMatchSnapshot()
    }))

    it('when some manifest files are invalid', apply(async () => {
      whichMockData.mockSync(() => null)
      const { fn, getParams } = mkfn('.')
      await fn()
      const params = getParams()
      whichMockData.restoreAll()

      expect(params.exitParams).toEqual([[ExitStatusCodes.Exception]])
      expect(params).toMatchSnapshot()
    }))
  })

  describe('group', () => {
    const item =
      (manifest: string, program: string) =>
        ({ manifest, program })

    const collection = new Set([
      item('foo/package.json', 'abc'),
      item('foo/package.json', 'def'),
      item('foo/package.json', 'ghi'),
      item('foo/package.json', 'abc'),
      item('bar/package.json', 'abc'),
      item('bar/package.json', 'jkl'),
      item('baz/package.json', 'mno')
    ])

    it('by manifests', () => {
      expect(new Map(groupByManifest(collection))).toMatchSnapshot()
    })

    it('by program', () => {
      expect(new Map(groupByProgram(collection))).toMatchSnapshot()
    })
  })

  describe('messageFromError', () => {
    it('when error is an instance of InvalidManifest', apply(async () => {
      await fromAllManifests('.').then(
        () => {
          throw new Error('Expecting promise to reject but it resolved')
        },
        error => {
          expect(messageFromError(error)).toMatchSnapshot()
        }
      )
    }))

    it('when error is an instance of Error', () => {
      expect(messageFromError(new Error('Hello, World!!'))).toMatchSnapshot()
    })
  })
})
