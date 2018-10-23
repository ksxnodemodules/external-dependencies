import getTable from 'require-external-programs-lib'
import { checkCommands } from 'require-external-programs-db'
import message from '../message-from-checker-result'

export = async (dirname: string): Promise<false | string> => {
  const table = await getTable(dirname)
  const collection = checkCommands(table)
  if (!collection.size) return false
  return message(collection)
}
