import { selectAd } from '../selectAd'
import { listRecommendProducts } from '../purchase'
import { getLogger } from 'log4js'
import { execUsecases, PickUsecasesTestParams, Ulid } from '@me/common'
const logger = getLogger('saga/buyProduct')

describe('ゲストが商品を購入する', () => {
  const buyProduct = { selectAd, listRecommendProducts }

  it('正常系 - ベタ書き', async () => {
    const naviEvent = await selectAd({ f: 'AdSelect', fromType: 'iphone' })
    expect(naviEvent).not.toBeNull()

    const products = await listRecommendProducts({ q: 'ListProducts', input: { keyword: 'fuga' } })
    expect(products).not.toBeNull()
  })

  it('正常系 - execUsecases でまとめて実行、テスト', async () => {
    const testParams: PickUsecasesTestParams<typeof buyProduct> = {
      selectAd: [{ f: 'AdSelect' }, { e: 'AdToPurchaseNavi' }],
      listRecommendProducts: [
        { q: 'ListProducts', input: { keyword: 'hoge fuga' } },
        { list: [{ productId: '1' }, { productId: '2' }] },
      ],
    }

    const results = await execUsecases(buyProduct, testParams)

    results.forEach((res) => {
      console.log(JSON.stringify(res, null, 2))
      // console.dir(res)
      expect(res.actual).toMatchObject(res.expected)
    })
  })
})
