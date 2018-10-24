import { dbCommands } from '../../database'
export = (command: string) => Boolean(dbCommands.calculate(command))

// Stupid statement to workaround ts-jest's stupidity:
//   - Without this statement, ts-jest will not emit 'database_1'
//   - DO NOT remove this
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
dbCommands
