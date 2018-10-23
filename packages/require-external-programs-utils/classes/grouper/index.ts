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

  public toString (): string {
    let result = ''

    for (const [title, set] of this) {
      result += `* ${title}\n`

      for (const member of set) {
        result += `  - ${member}\n`
      }

      result += '\n'
    }

    return result
  }

  public * [Symbol.iterator] () {
    yield * this.data
  }
}

export = Grouper
