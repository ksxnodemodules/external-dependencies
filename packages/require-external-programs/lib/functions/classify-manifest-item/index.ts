import { ManifestContent, ManifestClassification } from '../../types'
import { KEYWORD, KEYNAME } from '../../constants'
import { ManifestClassificationType } from '../../enums'
const { Included, Excluded, Invalid } = ManifestClassificationType

const INCLUDE: ManifestClassification.Included = { type: Included }
const EXCLUDE: ManifestClassification.Excluded = { type: Excluded }
const INVALID = (reason: string): ManifestClassification.Invalid => ({ type: Invalid, reason })

function classifyManifestItem (content: ManifestContent): ManifestClassification {
  const hasPeer = Boolean(content.peerDependencies && KEYWORD in content.peerDependencies)
  const hasKey = KEYNAME in content

  return hasKey
    ? hasPeer
      ? INCLUDE
      : INVALID(`Missing "${KEYWORD}" in "peerDependencies"`)
    : EXCLUDE
}

export = classifyManifestItem
