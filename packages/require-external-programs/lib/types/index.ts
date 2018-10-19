// tslint:disable:no-unnecessary-qualifier

import { KEYWORD, KEYNAME } from '../constants'
import { ManifestClassificationType } from '../enums'

export type ManifestList = ReadonlyArray<string>

export type ManifestClassification =
  ManifestClassification.Included |
  ManifestClassification.Excluded |
  ManifestClassification.Invalid

export namespace ManifestClassification {
  export interface Base {
    readonly type: ManifestClassificationType
  }

  export interface Included extends Base {
    readonly type: ManifestClassificationType.Included
  }

  export interface Excluded extends Base {
    readonly type: ManifestClassificationType.Excluded
  }

  export interface Invalid extends Base {
    readonly type: ManifestClassificationType.Invalid
    readonly reason: string
  }
}

export interface ManifestClassificationList {
  readonly included: ReadonlyArray<ManifestClassificationList.Included>
  readonly excluded: ReadonlyArray<ManifestClassificationList.Excluded>
  readonly invalid: ReadonlyArray<ManifestClassificationList.Invalid>
}

export namespace ManifestClassificationList {
  export interface Base {
    readonly manifestPath: string
    readonly manifestContent: ManifestContent
  }

  export interface Included extends Base {
    readonly manifestContent: ManifestContent.Included
  }

  export interface Excluded extends Base {}

  export interface Invalid extends Base {
    readonly reason: string
  }
}

export type ManifestContentList = ReadonlyArray<ManifestContentList.Item>

export namespace ManifestContentList {
  export interface Item {
    readonly manifestPath: string
    readonly manifestContent: ManifestContent
  }
}

export interface ManifestContent {
  readonly peerDependencies?: ManifestContent.DependencyDict
  readonly [KEYNAME]?: Requirements
}

export namespace ManifestContent {
  export interface Included extends ManifestContent {
    readonly peerDependencies: ManifestContent.DependencyDict.Included
  }

  export interface DependencyDict {
    readonly [KEYWORD]?: string
  }

  export namespace DependencyDict {
    export interface Included extends DependencyDict {
      readonly [KEYWORD]: string
    }
  }
}

export type Requirements = ReadonlyArray<string>
