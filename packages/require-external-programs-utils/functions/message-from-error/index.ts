import { InvalidManifestError } from 'require-external-programs-lib'
import fromInvalidManifestError from '../message-from-invalid-manifest-error'

export = <Error>(error: Error): string | Error => {
  if (error instanceof InvalidManifestError) return fromInvalidManifestError(error)
  return error
}
