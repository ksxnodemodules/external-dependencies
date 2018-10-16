const getName = Symbol('getName')

abstract class Base extends Error {
  protected static readonly getName: typeof getName = getName
  protected abstract [getName] (): string

  constructor (message: string) {
    super(message)
    this.name = this[getName]()
  }
}

export = Base
