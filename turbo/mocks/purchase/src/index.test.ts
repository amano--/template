import { hoge } from '.'

describe('simple test', () => {
  it('dom draw', () => {
    const test = hoge

    expect(test).toContain('hoge1')
  })
})
