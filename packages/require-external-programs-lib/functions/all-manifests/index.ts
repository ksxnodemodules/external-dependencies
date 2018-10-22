import path from 'path'
import glob from 'glob-promise'
import { ManifestList } from '../../types'

function getAllManifests (dirname: string): Promise<ManifestList> {
  return glob(path.join(dirname, '**/package.json'))
}

export = getAllManifests
