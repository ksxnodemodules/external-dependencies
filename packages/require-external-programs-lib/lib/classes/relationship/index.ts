import { RelationshipSet } from './utils'

class Relationship<A, B> implements Iterable<[A, B]> {
  private readonly data = new RelationshipSet<A, B>()

  public * [Symbol.iterator] () {
    yield * this.data
  }

  public has (a: A, b: B): boolean {
    return this.data.has([a, b])
  }

  public add (a: A, b: B): this {
    this.data.add([a, b])
    return this
  }

  public delete (a: A, b: B): boolean {
    return this.data.delete([a, b])
  }
}

export = Relationship
