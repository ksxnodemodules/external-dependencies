import { dbCommands } from '../../database'
const fn = (command: string) => Boolean(dbCommands.calculate(command))
export = fn
