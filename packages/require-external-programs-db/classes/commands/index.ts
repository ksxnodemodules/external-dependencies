import which from 'which'
import Calculator from 'cached-expression'

class Commands extends Calculator<string, string | null> {
  constructor () {
    super(command => which.sync(command, { nothrow: true }))
  }
}

export = Commands
