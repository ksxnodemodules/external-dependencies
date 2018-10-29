import chalk from 'chalk'
import { Grouper } from '../../classes'

const programPrefix = chalk.dim('* ')
const manifestPrefix = chalk.dim('  - ') + chalk.dim.italic('required by ')

export = (grouper: Grouper<string, string>): string => {
  let result = `\nMissing ${grouper.size} external programs\n`

  for (const [program, dependants] of grouper) {
    result += programPrefix + chalk.bold(program) + '\n'

    for (const manifest of dependants) {
      result += manifestPrefix + chalk.italic(manifest) + '\n'
    }

    result += '\n'
  }

  return result
}
