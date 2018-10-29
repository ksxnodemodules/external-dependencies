import originalSemver from 'semver'
import { SATISFIES_ALL, UNSATISFIES_ALL } from './data'

function replacementSemver (...args: any[]) {
  // @ts-ignore
  return originalSemver(...args)
}

namespace replacementSemver {
  export function satisfies (version: string, range: string, loose: boolean) {
    if (range === SATISFIES_ALL) return true
    if (range === UNSATISFIES_ALL) return false
    return originalSemver.satisfies(version, range, loose)
  }
}

export = replacementSemver
