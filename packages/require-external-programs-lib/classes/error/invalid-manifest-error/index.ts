import { ManifestClassificationList } from '../../../types'
import Base from '../base'
import Invalid = ManifestClassificationList.Invalid

class InvalidManifestError extends Base {
  readonly map: InvalidManifestError.ManifestMap

  constructor (data: InvalidManifestError.Data) {
    super(`Detected ${data.length} invalid items`)
    this.map = new InvalidManifestError.ManifestMap(data)
  }

  protected [Base.getName] (): string {
    return 'InvalidManifest'
  }
}

namespace InvalidManifestError {
  export type Data = ReadonlyArray<Invalid>

  export class ManifestMap extends Map<string, Invalid> {
    constructor (data: Data) {
      super(data.map(item => [item.manifestPath, item] as [string, Invalid]))
    }
  }
}

export = InvalidManifestError
