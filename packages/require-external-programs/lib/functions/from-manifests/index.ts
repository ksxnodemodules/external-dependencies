import { readFile } from 'fs-extra'
import { ManifestList, ManifestContent } from '../../types'
import { KEYNAME } from '../../constants'
import { Relationship, InvalidManifestError } from '../../classes'
import classifyManifestList from '../classify-manifest-list'

class Result extends Relationship<string, string> {}

async function loadFromManifests (list: ManifestList): Promise<Result> {
  const unclassified = await Promise.all(
    list.map(async manifestPath => ({
      manifestPath,
      manifestContent: JSON.parse(await readFile(manifestPath, { encoding: 'utf8' })) as ManifestContent
    }))
  )

  const { included, invalid } = classifyManifestList(unclassified)

  if (invalid.length) {
    throw new InvalidManifestError(invalid)
  }

  const result = new Result()

  for (const { manifestPath, manifestContent } of included) {
    if (!manifestContent[KEYNAME]) continue

    const list = manifestContent[KEYNAME]
    if (!list) continue

    for (const program of list) {
      result.add(manifestPath, program)
    }
  }

  return result
}

export = loadFromManifests
