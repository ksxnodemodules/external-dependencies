import { ExitStatusCodes } from '../../enums'
import { examine } from '../../functions'
const { Satisfied, Unsatisfied, CaughtException, UncaughtException } = ExitStatusCodes

export = <Return>(
  dirname: string,
  log: (error: any) => void,
  exit: (status: ExitStatusCodes) => Return
) => examine(dirname).then(
  result => {
    if (result.satisfied) return exit(Satisfied)
    if (!result.error) return exit(Unsatisfied)
    log(result.response)
    return exit(CaughtException)
  },
  error => {
    log(error)
    return exit(UncaughtException)
  }
)
