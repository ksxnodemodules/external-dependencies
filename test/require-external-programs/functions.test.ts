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

import {
  groupByManifest,
  groupByProgram
} from 'require-external-programs-utils'

import createVirtualEnvironment from './virtual-env'
const { apply } = createVirtualEnvironment()

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

      it(`whose "peerDependencies" lacks "${KEYWORD}"`, mkfn('invalid', 'missing-dependency-in-peer'))
      it('which lacks "peerDependencies"', mkfn('invalid', 'missing-field-of-peer'))
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
})
