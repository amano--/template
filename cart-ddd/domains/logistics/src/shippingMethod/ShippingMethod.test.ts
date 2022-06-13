import { UserLank, UserLankTag } from '@alike-ca/common'
import { DeliverySpecTagAll, ShippingMethod } from './ShippingMethod'

describe('ShippingMethod simple test', () => {
  describe('get', () => {
    it('個別のメソッドが呼べることを確認', async () => {
      expect(ShippingMethod.get('doraemon', 'suneo').summonMama()).toEqual('スネちゃま、おこずかいあげる')
    })
  })

  describe('findByUserLank', () => {
    // TODO テーブル形式による型情報補完のやり方
    // test.each`
    //   a    | b    | expected
    //   ${1} | ${1} | ${2}
    //   ${1} | ${2} | ${3}
    //   ${2} | ${1} | ${3}
    // `('returns $expected when $a is added $b', ({ a, b, expected }) => {
    //   expect(a + b).toBe(expected)
    // })

    const params: { ult: UserLankTag; dsts: DeliverySpecTagAll[] }[] = [
      { ult: 'None', dsts: [] },
      { ult: 'Bronze', dsts: ['gufu'] },
      { ult: 'Silver', dsts: ['gufu', 'suneo'] },
      { ult: 'Gold', dsts: ['gufu', 'suneo', 'gundam'] },
      { ult: 'Platinum', dsts: ['gufu', 'suneo', 'gundam', 'dora'] },
    ]
    test.each(params)('UserLank=$ult expected DeliverySpec=$dsts', ({ ult, dsts }) => {
      const res = ShippingMethod.findByUserLank(UserLank.get(ult))
      // Object.keys(res).forEach((dst) => {
      //   expect(dsts.some((k) => k === dst)).toBeTruthy()
      // })

      // 並び順が一定でないので、ソートし直した者同士を比較
      expect(Object.keys(res).sort()).toEqual(dsts.sort())
    })
  })
})
