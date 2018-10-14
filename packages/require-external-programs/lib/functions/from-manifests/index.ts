import { readFile } from 'fs-extra'
import { ManifestList } from '../../types'
import { Relationship } from '../../classes'

class Result extends Relationship<string, string> {}

async function loadFromManifests (list: ManifestList): Promise<Result> {
  const result = new Result()

  const unvalidatedList = await Promise.all(
    list.map(async manifestPath => ({
      manifestPath,
      manifestContent: JSON.parse(await readFile(manifestPath, { encoding: 'utf8' }))
    }))
  )

  return result
}

export = loadFromManifests
