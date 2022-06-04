import { selectAd } from '../selectAd'
import { listRecommendProducts, addCart, settleCart } from '../purchase'
import { getLogger } from 'log4js'
import { execUsecases, PickUsecasesTestParams, Ulid, apiPurchase, expectUsecases } from '@me/common'

const logger = getLogger('saga/buyProduct')

const buyProduct = { selectAd, listRecommendProducts, addCart, settleCart } as const
type TestParams = PickUsecasesTestParams<typeof buyProduct>

const success: TestParams = {
  selectAd: { in: { q: 'AdSelect' }, out: { r: 'AdToPurchaseNavi' } },
  listRecommendProducts: {
    in: { q: 'ListProducts', input: { keyword: 'hoge fuga' } },
    out: { list: [{ productId: 'normal' }, { productId: 'outOfStock' }] },
  },
  addCart: { in: { c: 'CartAdd', productId: 'normal' }, out: { r: 'CartAddSuccess' } },
  settleCart: {
    in: { c: 'CartSettle', account: { userId: 'normal', name: 'Bronze聖闘士' }, list: [{ productId: 'normal' }] },
    out: { r: 'CartSettleSuccess' },
  },
}

describe('(saga) ユーザーが商品を購入する', () => {
  // it('正常系 - ベタ書き', async () => {
  //   const naviEvent = await selectAd({ q: 'AdSelect', fromType: 'iphone' })
  //   expect(naviEvent).not.toBeNull()

  //   const products = await listRecommendProducts({ q: 'ListProducts', input: { keyword: 'fuga' } })
  //   expect(products).not.toBeNull()
  // })

  it('正常系 - execUsecases でまとめて実行、テスト', async () => {
    const results = await execUsecases(buyProduct, success)

    Object.values(results).forEach((res) => {
      console.log(JSON.stringify(res, null, 2))
      // console.dir(res)
      expect(res.actual).toMatchObject(res.expected)
    })
  })
})

describe('* (addCart) カートに登録する', () => {
  describe('代替フロー', () => {
    it('カートに商品を追加時、品切れ状態だった場合,関連商品が返却される', async () => {
      const results = await expectUsecases(buyProduct, {
        ...success,
        addCart: {
          in: { ...success.addCart.in, productId: 'outOfStock' },
          out: { r: 'CartAddProductOutOfStock' },
        },
      })
      console.log(results.addCart.actual)

      // response event が Union型で その詳細までテストしたい場合 if や switch で型の絞り込みをしてから、expect する
      const event = results.addCart.actual
      if (event.r === 'CartAddProductOutOfStock') {
        expect(event.list).toEqual([{ productId: 'relate1' }, { productId: 'relate2' }])
      }
    })
  })
})

describe('* (settleCart) カートを決済する', () => {
  describe('代替フロー', () => {
    it('ゲストが決済しようとした時、ユーザー登録画面に誘導されるイベントが返却される', async () => {
      const results = await expectUsecases(buyProduct, {
        ...success,
        settleCart: {
          in: { ...success.settleCart.in, account: { guest: true, fromUrl: '' } },
          out: { r: 'NaviToUserEntry' },
        },
      })
      console.log(results.settleCart.actual)

      const event = results.settleCart.actual
      if (event.r === 'NaviToUserEntry') {
        expect(event.callBy).not.toBeNull()
      }
    })
  })
})
