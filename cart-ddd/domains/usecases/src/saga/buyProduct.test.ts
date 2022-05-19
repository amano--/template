import { selectAd } from '../selectAd'
import { listRecommendProducts, addCart } from '../purchase'
import { getLogger } from 'log4js'
import { execUsecases, PickUsecasesTestParams, Ulid, purchaseApi, expectUsecases } from '@me/common'
const logger = getLogger('saga/buyProduct')

const buyProduct = { selectAd, listRecommendProducts, addCart } as const
type TestParams = PickUsecasesTestParams<typeof buyProduct>

const successTestParams: TestParams = {
  selectAd: { in: { q: 'AdSelect' }, out: { r: 'AdToPurchaseNavi' } },
  listRecommendProducts: {
    in: { q: 'ListProducts', input: { keyword: 'hoge fuga' } },
    out: { list: [{ productId: 'normal' }, { productId: 'outOfStock' }] },
  },
  addCart: { in: { c: 'CartAdd', productId: 'normal' }, out: { r: 'CartAddSuccess' } },
}

describe('ゲストが商品を購入する', () => {
  it('正常系 - ベタ書き', async () => {
    const naviEvent = await selectAd({ q: 'AdSelect', fromType: 'iphone' })
    expect(naviEvent).not.toBeNull()

    const products = await listRecommendProducts({ q: 'ListProducts', input: { keyword: 'fuga' } })
    expect(products).not.toBeNull()
  })

  it('正常系 - execUsecases でまとめて実行、テスト', async () => {
    const results = await execUsecases(buyProduct, successTestParams)

    Object.values(results).forEach((res) => {
      console.log(JSON.stringify(res, null, 2))
      // console.dir(res)
      expect(res.actual).toMatchObject(res.expected)
    })
  })
})

describe('* カートに登録する', () => {
  describe('代替フロー', () => {
    it('カートに商品を追加時、品切れ状態だった場合,関連商品が返却される', async () => {
      const res = await expectUsecases(buyProduct, {
        ...successTestParams,
        addCart: {
          in: { c: 'CartAdd', productId: 'outOfStock' },
          out: { r: 'CartAddProductOutOfStock' },
        },
      })
      console.log(res.addCart.actual)
      // console.log(res.addCart.actual.list)
    })
  })
})
