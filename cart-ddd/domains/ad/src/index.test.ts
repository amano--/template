import { purchaseHoge } from '.'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { purchaseMock } from '@alike-ca/mocks'

describe('simple test', () => {
  it('dom draw', () => {
    console.log('')
    expect(purchaseHoge).toContain('purchaseHoge')

    expect(purchaseMock).toContain('purchaseMock')
  })
})
