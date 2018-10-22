import path from 'path'
import { readFile } from 'fs-extra'

import defaultExport, {
  fromAllManifests,
  allManifests,
  classifyManifestList,
  InvalidManifestError,
  KEYWORD,
  KEYNAME,
  ManifestContentList
} from 'require-external-programs'

import createVirtualEnvironment from './virtual-env'
const { apply } = createVirtualEnvironment()

describe('default export', () => {
  it('is fromAllManifests', () => {
    expect(defaultExport).toBe(fromAllManifests)
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
