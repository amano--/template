import { UserLank, UserLankTag } from '@alike-ca/common'
import { DeliveryMethodTagAll, DeliveryProvider } from './DeliveryProvider'

describe('DeliveryProvider simple test', () => {
  describe('get', () => {
    it('個別の DeliveryMethod のメソッドが呼べることを確認', () => {
      expect(DeliveryProvider.get('doraemon', 'suneo').summonMama()).toEqual('スネちゃま、おこずかいあげる')
      expect(DeliveryProvider.get('gundam', 'gundam').naguttane()).toEqual('殴ったね、ジオングにも殴られたことないのに')
    })
  })

  describe('findByUserLank', () => {
    it('UserLankTag の文字列で取得したものと、UserLankで取得できるものと同じものであることを確認', () => {
      expect(DeliveryProvider.findByUserLank('Bronze')).toEqual(DeliveryProvider.findByUserLank(UserLank.get('Bronze')))
      expect(DeliveryProvider.findByUserLank('Silver')).not.toEqual(
        DeliveryProvider.findByUserLank(UserLank.get('Bronze'))
      )
    })
    // TODO テーブル形式による型情報を更かして補完を効かす方法の調査
    // test.each`
    //   a    | b    | expected
    //   ${1} | ${1} | ${2}
    //   ${1} | ${2} | ${3}
    //   ${2} | ${1} | ${3}
    // `('returns $expected when $a is added $b', ({ a, b, expected }) => {
    //   expect(a + b).toBe(expected)
    // })

    test.each([
      { ult: 'None', expected: [] },
      { ult: 'Bronze', expected: ['gufu'] },
      { ult: 'Silver', expected: ['gufu', 'suneo'] },
      { ult: 'Gold', expected: ['gufu', 'suneo', 'gundam'] },
      { ult: 'Platinum', expected: ['gufu', 'suneo', 'gundam', 'dora'] },
    ] as { ult: UserLankTag; expected: DeliveryMethodTagAll[] }[])(
      'UserLank=$ult のユーザーは $expected の配送方法が選択できる',
      ({ ult, expected }) => {
        const res = DeliveryProvider.findByUserLank(ult)
        // 並び順が expected と違うので、ソートし直した者同士を比較
        expect(Object.keys(res).sort()).toEqual(expected.sort())
      }
    )
  })
})
