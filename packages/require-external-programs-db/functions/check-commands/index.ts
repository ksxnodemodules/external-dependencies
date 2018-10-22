import { Result as Table } from 'require-external-programs-lib'
import { CheckCommandsResult } from '../../types'
import commandExists from '../command-exists'

function checkCommands (table: Table): CheckCommandsResult {
  const unsatisfied = new Set<CheckCommandsResult.Item>()

  for (const [manifest, program] of table) {
    if (!commandExists(program)) unsatisfied.add({ manifest, program })
  }

  return unsatisfied
}

export = checkCommands
