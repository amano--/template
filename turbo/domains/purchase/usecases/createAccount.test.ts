import { purchaseHoge } from './createAccount'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { purchaseMock } from 'mocks';

describe('simple test', () => {
  it('dom draw', () => {
    

    
    expect(purchaseHoge).toContain('purchaseHoge')
    expect(purchaseMock).toContain('purchaseMock')
  })
})
