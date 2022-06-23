import { purchaseUsecase } from './createUser'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { adMock } from '@alike-ddd/mocks'

describe('selectAd', () => {
  it('test simple', () => {
    expect(purchaseUsecase).toContain('purchaseUsecase')
    expect(purchaseMock).toContain('purchaseMock')
    expect(adMock).toContain('adMock')
  })
})
