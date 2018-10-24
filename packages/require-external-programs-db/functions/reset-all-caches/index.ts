import { dbCommands } from '../../database'

function resetAllCaches () {
  dbCommands.resetCache()
}

export = resetAllCaches
