import chalk from 'chalk'
import { InvalidManifestError } from 'require-external-programs-lib'

export = (error: InvalidManifestError): string => {
  let result = `\n[${chalk.bold(error.name + ':')} ${error.message}]\n`

  for (const { manifestPath, reason } of error.map.values()) {
    result += `  * at ${chalk.italic(manifestPath)}\n`
    result += `    → ${reason}\n`
  }

  return result
}
