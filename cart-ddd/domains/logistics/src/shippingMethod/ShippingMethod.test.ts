import { UserLank, UserLankTag } from '@alike-ca/common'
import { DeliverySpecTag, DeliverySpecTagAll, ShippingMethod } from './ShippingMethod'

describe('ShippingMethod simple test', () => {
  describe('get', () => {
    it('個別のメソッドが呼べることを確認', async () => {
      expect(ShippingMethod.get('doraemon', 'suneo').summonMama()).toEqual('スネちゃま、おこずかいあげる')
    })
  })

  // it('findByUserLank', async () => {
  //   //TODO
  //   console.log(ShippingMethod.list)
  //   expect(Object.keys(ShippingMethod.findByUserLank(UserLank.get('Silver')))).toEqual(['gufu'])
  //   expect(Object.keys(ShippingMethod.findByUserLank(UserLank.get('Platinum')))).toEqual(['dora'])
  // })

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

    const params: [UserLankTag, DeliverySpecTagAll[]][] = [
      ['Bronze', ['gufu']],
      ['Silver', ['gufu', 'suneo']],
      ['Gold', ['gufu', 'suneo', 'gundam']],
      ['Platinum', ['gufu', 'suneo', 'gundam', 'dora']],
    ]
    //TODO 正しくメッセージ表示
    test.each(params)('lank=%i DeliverySpec=$1', (lank, expected) => {
      expect(Object.keys(ShippingMethod.findByUserLank(UserLank.get(lank)))).toEqual(expect.arrayContaining(expected))
    })
  })
})
