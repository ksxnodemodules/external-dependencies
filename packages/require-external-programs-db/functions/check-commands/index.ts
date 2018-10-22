import { Result as Table } from 'require-external-programs-lib'
import { CheckCommandsResult } from '../../types'
import commandExists from '../command-exists'

function checkCommands (table: Table): CheckCommandsResult {
  const result = new Set<CheckCommandsResult.Item>()

  for (const [manifest, program] of table) {
    const satisfied = commandExists(program)
    result.add({ manifest, program, satisfied })
  }

  return result
}

export = checkCommands
