import { ExitStatusCodes } from 'require-external-programs-utils'

describe('ExitStatusCodes', () => {
  it('matches snapshot', () => {
    expect(ExitStatusCodes).toMatchSnapshot()
  })
})
