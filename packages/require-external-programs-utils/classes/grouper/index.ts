import Base from 'advanced-map-initialized'

class Grouper<Title, Member>
extends Base<Title, Set<Member>>
implements Iterable<[Title, Set<Member>]> {
  constructor () {
    super(Map, () => new Set())
  }

  public addMember (title: Title, member: Member): this {
    this.get(title).add(member)
    return this
  }

  public * [Symbol.iterator] () {
    // @ts-ignore // WORKAROUND: ts-jest
    yield * this.data
  }
}

export = Grouper
