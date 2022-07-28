import { Money } from '@alike-ddd/common'
import { priceDiscounter, percentDiscounter } from './discountRule'

describe('discountRule - 設計のための雑テスト集', () => {
  it('priceDiscounter', () => {
    const target = priceDiscounter(Money.create(1300))(Money.create(2000))
    expect(target).toMatchObject({
      label: '1,300円引き',
      money: { amount: 700 },
    })
  })

  it('percentDiscounter', () => {
    const target = percentDiscounter(20)(Money.create(2000))
    expect(target).toMatchObject({
      label: '20%引き(400円)',
      money: { amount: 1600 },
    })
  })
})
