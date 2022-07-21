import { Money } from '@alike-ddd/common'
import { priceDiscounter } from './discountRule'

describe('discountRule - 設計のための雑テスト集', () => {
  it('priceDiscounter', () => {
    const target = priceDiscounter(Money.create(1300))(Money.create(2000))
    expect(target).toMatchObject({
      label: '1,300円引き',
      money: { amount: 700 },
    })
  })
})
