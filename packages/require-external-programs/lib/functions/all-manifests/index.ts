import glob from 'glob-promise'
import { ManifestList } from '../../types'

function getAllManifests (dirname: string): Promise<ManifestList> {
  return glob('**/package.json', { root: dirname })
}

export = getAllManifests
