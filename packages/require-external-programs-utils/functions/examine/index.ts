import getTable from 'require-external-programs-lib'
import { checkCommands } from 'require-external-programs-db'
import { ExaminationResult } from '../../types'
import message from '../message-from-checker-result'

export = async (dirname: string): Promise<ExaminationResult> => {
  try {
    const table = await getTable(dirname)
    const collection = checkCommands(table)

    return collection.size
      ? {
        satisfied: false,
        error: false,
        response: message(collection)
      }
      : {
        satisfied: true,
        error: false
      }
  } catch (response) {
    return {
      satisfied: false,
      error: true,
      response
    }
  }
}
