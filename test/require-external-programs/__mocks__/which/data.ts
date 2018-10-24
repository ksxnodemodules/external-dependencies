import which from 'which'
import { resetAllCaches } from 'require-external-programs-db'
const originalSync = which.sync

export function getMain (): (...args: any[]) => any {
  return () => {
    throw new Error('Not implemented')
  }
}

let syncFunc: typeof originalSync = originalSync

export function getSync () {
  return syncFunc
}

export function mockSync (condition: (cmd: string) => string | null) {
  const params = new Set()

  // @ts-ignore
  syncFunc = (cmd: string, ...rest: any[]) => {
    params.add([cmd, ...rest])
    return condition(cmd)
  }

  const getParams = () => params
  return { syncFunc, getParams }
}

export function restoreSync () {
  syncFunc = originalSync
}

export function restoreAll () {
  restoreSync()
  resetAllCaches()
}
