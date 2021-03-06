import { Relationship } from 'require-external-programs-lib'
import { Grouper } from 'require-external-programs-utils'

describe('Relationship', () => {
  class Instance extends Relationship<number, string> {}

  function create () {
    const instance = new Instance()
    const snap = () => new Map(instance)
    return { instance, snap }
  }

  it('.add', () => {
    const { instance, snap } = create()
    const a = snap()
    const instance0 = instance.add(0, 'zero')
    const b = snap()
    const instance1 = instance0.add(1, 'one')
    const c = snap()

    expect({ a, b, c }).toMatchSnapshot()
    expect(instance0).toBe(instance)
    expect(instance1).toBe(instance)
  })

  it('.delete()', () => {
    const { instance, snap } = create()

    const a = snap()
    instance.add(0, 'zero').add(1, 'one').add(2, 'two')
    const b = snap()
    const del1one = instance.delete(1, 'one')
    const del3two = instance.delete(3, 'two')
    const del0two = instance.delete(0, 'two')
    const c = snap()

    expect({
      snapshots: { a, b, c },
      deletion: { del1one, del3two, del0two }
    }).toMatchSnapshot()
  })

  it('.has()', () => {
    const snap = () => [instance.has(0, 'zero'), instance.has(1, 'one')]
    const { instance } = create()

    const a = snap()
    instance.add(0, 'zero').add(1, 'one')
    const b = snap()
    instance.delete(0, 'zero')
    instance.add(0, '0')
    const c = snap()

    expect({ a, b, c }).toMatchSnapshot()
  })
})

describe('Grouper', () => {
  class Instance extends Grouper<string, number> {}

  function create () {
    const instance = new Instance()
    const snap = () => new Map(instance)
    return { instance, snap }
  }

  it('.addMember()', () => {
    const { instance, snap } = create()

    const a = snap()
    instance.addMember('012', 0, 1, 2)
    const b = snap()
    instance.addMember('34', 3, 4)
    const c = snap()
    instance.addMember('5', 5)
    const d = snap()

    expect({ a, b, c, d }).toMatchSnapshot()
  })

  it('.toString()', () => {
    const instance = new Instance()
      .addMember('0', 0)
      .addMember('12', 1, 2)
      .addMember('345', 3, 4, 5)

    expect(`\n${instance}\n`).toMatchSnapshot()
  })
})
