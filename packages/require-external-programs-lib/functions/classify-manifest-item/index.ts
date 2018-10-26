import { ManifestContent, ManifestClassification } from '../../types'
import { KEYWORD, KEYNAME } from '../../constants'
import { ManifestClassificationType } from '../../enums'
const { Included, Excluded, Invalid } = ManifestClassificationType

const INCLUDE: ManifestClassification.Included = { type: Included }
const EXCLUDE: ManifestClassification.Excluded = { type: Excluded }
const INVALID = (reason: string): ManifestClassification.Invalid => ({ type: Invalid, reason })

function classifyManifestItem (content: ManifestContent): ManifestClassification {
  if (content.dependencies && KEYWORD in content.dependencies) {
    const message = `Found "${KEYWORD}" in "dependencies"`
    const advice = `use a combination of "peerDependencies" and "dependencies" instead`
    return INVALID(`${message}, ${advice}`)
  }

  if (!(KEYNAME in content)) return EXCLUDE

  if (!(content.peerDependencies && KEYWORD in content.peerDependencies)) {
    return INVALID(`Missing "${KEYWORD}" in "peerDependencies"`)
  }

  const list = content[KEYNAME]
  if (!Array.isArray(list)) {
    return INVALID(`Expecting "${KEYWORD}" to be an array but received ${JSON.stringify(list)}`)
  }

  return INCLUDE
}

export = classifyManifestItem
