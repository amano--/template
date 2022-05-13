import { purchaseApi } from '.'
// import { purchaseMock } from '../../mocks/src/purchase/index';

describe('purchase', () => {
  it('simple test', async () => {
    const log = await purchaseApi.saveEvent({ c: 'AddCart', productId: '' })

    console.log('log=', log)
    expect(log).not.toBeNull()
  })
})
