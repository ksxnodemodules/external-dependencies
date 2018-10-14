import { ManifestContentList, ManifestClassificationList } from '../../types'
import { ManifestClassificationType } from '../../enums'
import classifyManifestItem from '../classify-manifest-item'
const { Included, Excluded, Invalid } = ManifestClassificationType

function classifyManifestList (list: ManifestContentList): ManifestClassificationList {
  const included = Array<ManifestClassificationList.Included>()
  const excluded = Array<ManifestClassificationList.Excluded>()
  const invalid = Array<ManifestClassificationList.Invalid>()

  for (const { manifestContent, manifestPath } of list) {
    const classification = classifyManifestItem(manifestContent)

    switch (classification.type) {
      case Included:
      case Excluded:
        included.push({ manifestContent, manifestPath })
        break
      case Invalid:
        invalid.push({ manifestContent, manifestPath, reason: classification.reason })
    }
  }

  return { included, excluded, invalid }
}

export = classifyManifestList
