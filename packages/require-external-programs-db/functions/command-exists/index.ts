import { dbCommands } from '../../database'
export = (command: string) => Boolean(dbCommands.calculate(command))

// Stupid command to workaround ts-jest's stupidity
// @ts-ignore
; (() => undefined)(dbCommands)
