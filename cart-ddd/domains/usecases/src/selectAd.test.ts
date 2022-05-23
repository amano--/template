import { purchaseUsecase } from './createUser'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { adMock, purchaseMock } from '@me/mocks'

describe('selectAd', () => {
  it('test simple', () => {
    expect(purchaseUsecase).toContain('purchaseUsecase')
    expect(purchaseMock).toContain('purchaseMock')
    expect(adMock).toContain('adMock')
  })
})
