import semver from 'semver'
import { ManifestContent, ManifestClassification } from '../../types'
import { KEYWORD, KEYNAME, VERSION } from '../../constants'
import { ManifestClassificationType } from '../../enums'
const { Included, Excluded, Invalid } = ManifestClassificationType

const INCLUDE: ManifestClassification.Included = { type: Included }
const EXCLUDE: ManifestClassification.Excluded = { type: Excluded }
const INVALID = (reason: string): ManifestClassification.Invalid => ({ type: Invalid, reason })

function classifyManifestItem (content: ManifestContent): ManifestClassification {
  if (content.peerDependencies && KEYWORD in content.peerDependencies) {
    return INVALID(`Found "${KEYWORD}" in "peerDependencies", use "dependencies" instead`)
  }

  if (!(KEYNAME in content)) return EXCLUDE

  if (content.dependencies && KEYWORD in content.dependencies) {
    return classifyByDependency(content.dependencies as any, content as any)
  }

  if (content.devDependencies && KEYWORD in content.devDependencies) {
    return classifyByDependency(content.devDependencies as any, content as any)
  }

  return INVALID(`Found "${KEYNAME}" but not "${KEYWORD}" in either "dependencies" or "devDependencies"`)
}

function classifyByDependency (
  dict: ManifestContent.DependencyDict.Included,
  content: ManifestContent.Included
): ManifestClassification {
  const versionRange = dict[KEYWORD]
  if (!semver.satisfies(VERSION, versionRange)) return EXCLUDE

  const list = content[KEYNAME]
  if (!Array.isArray(list)) {
    return INVALID(`Expecting "${KEYWORD}" to be an array but received ${JSON.stringify(list)}`)
  }

  return INCLUDE
}

export = classifyManifestItem
