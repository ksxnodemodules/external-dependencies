import { dbCommands } from '../../database'
export = (command: string) => Boolean(dbCommands.calculate(command))

// Stupid statement to workaround ts-jest's stupidity
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
; dbCommands
