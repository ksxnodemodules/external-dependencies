import { ExitStatusCodes } from '../../enums'
import { examine } from '../../functions'
const { Satisfied, Unsatisfied, CaughtException, UncaughtException } = ExitStatusCodes

export = <Return>(
  dirname: string,
  log: (error: any) => void,
  exit: (status: ExitStatusCodes) => Return
): Promise<Return> => examine(dirname).then(
  result => {
    if (result.satisfied) return exit(Satisfied)
    log(result.response)
    return exit(result.error ? CaughtException : Unsatisfied)
  },
  error => {
    log(error)
    return exit(UncaughtException)
  }
)
