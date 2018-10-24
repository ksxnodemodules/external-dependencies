import { getMain, getSync } from './data'

function which (...args: any[]) {
  return getMain()(...args)
}

namespace which {
  export function sync (...args: any[]) {
    // @ts-ignore
    return getSync()(...args)
  }
}

export = which
