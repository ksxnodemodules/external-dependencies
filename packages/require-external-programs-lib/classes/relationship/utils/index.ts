import MultiKeySet from 'advanced-set-mutable-multi-key'

export class RelationshipSet<A, B> extends MultiKeySet<[A, B]> implements Iterable<[A, B]> {
  constructor () {
    super(Set)
  }

  public * [Symbol.iterator] () {
    yield * this.data
  }
}
