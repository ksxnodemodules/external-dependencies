import { ManifestContent, ManifestClassification } from '../../types'
import { KEYWORD, KEYNAME } from '../../constants'
import { ManifestClassificationType } from '../../enums'
const { Included, Excluded, Invalid } = ManifestClassificationType

const INCLUDE: ManifestClassification.Included = { type: Included }
const EXCLUDE: ManifestClassification.Excluded = { type: Excluded }
const INVALID = (reason: string): ManifestClassification.Invalid => ({ type: Invalid, reason })

function classifyManifestItem (content: ManifestContent): ManifestClassification {
  const hasProd = Boolean(content.dependencies && KEYWORD in content.dependencies)
  const hasPeer = Boolean(content.peerDependencies && KEYWORD in content.peerDependencies)
  const hasKey = KEYNAME in content

  if (hasProd) {
    return INVALID(
      `Found "${KEYWORD}" in "dependencies", use a combination of "peerDependencies" and "dependencies" instead`
    )
  }
  if (!hasKey) return EXCLUDE
  if (!hasPeer) return INVALID(`Missing "${KEYWORD}" in "peerDependencies"`)

  const list = content[KEYNAME]
  if (!Array.isArray(list)) {
    return INVALID(`Expecting "${KEYWORD}" to be an array but received ${JSON.stringify(list)}`)
  }

  return INCLUDE
}

export = classifyManifestItem
