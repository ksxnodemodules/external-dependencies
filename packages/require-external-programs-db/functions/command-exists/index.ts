import { dbCommands } from '../../database'

export = (command: string) =>
  Boolean(dbCommands.calculate(command))
