import path from 'path'
import glob from 'glob-promise'
import { ManifestList } from '../../types'

async function getAllManifests (dirname: string): Promise<ManifestList> {
  return (await glob('**/package.json', { realpath: true, root: dirname }))
    .map(suffix => path.join(dirname, suffix))
}

export = getAllManifests
