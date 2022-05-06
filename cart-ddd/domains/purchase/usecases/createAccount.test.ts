import { purchaseUsecase } from './createAccount'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { purchaseMock } from 'mocks'

describe('simple test', () => {
  it('dom draw', () => {
    expect(purchaseUsecase).toContain('purchaseUsecase')
    expect(purchaseMock).toContain('purchaseMock')
  })
})
