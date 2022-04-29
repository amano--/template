import { purchaseHoge } from '.'

describe('simple test', () => {
  it('dom draw', () => {
    const test = purchaseHoge

    expect(test).toContain('purchaseHoge')
  })
})
