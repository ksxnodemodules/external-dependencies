import getTable from 'require-external-programs-lib'
import { checkCommands } from 'require-external-programs-db'
import { ExaminationResult } from '../../types'
import messageFromCheckerResult from '../message-from-checker-result'
import messageFromError from '../message-from-error'

export = async (dirname: string): Promise<ExaminationResult> => {
  try {
    const table = await getTable(dirname)
    const collection = checkCommands(table)

    return collection.size
      ? {
        satisfied: false,
        error: false,
        response: messageFromCheckerResult(collection)
      }
      : {
        satisfied: true,
        error: false
      }
  } catch (response) {
    return {
      satisfied: false,
      error: true,
      response: messageFromError(response)
    }
  }
}
