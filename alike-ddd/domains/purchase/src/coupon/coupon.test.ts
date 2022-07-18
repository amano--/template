import { Coupon } from './coupon'

describe('(addCart) ユーザーは商品をカートに追加する', () => {
  it('成功した場合', () => {
    expect(Coupon.priceDown.amount).toEqual(100)
  })

  // it('品切れ状態の商品を選んだ場合', async () => {
  //   await expectUsecaseLine(addCart, { c: 'CartAdd', productId: 'outOfStock' }, { r: 'CartAddProductOutOfStock' })
  // })
})
