import { selectAd } from '../selectAd'
import { listRecommendProducts } from '../purchase'
import * as _ from 'lodash'
import { getLogger } from 'log4js'
import { PickUsecasesTestParams, Ulid } from '../../../common/src/index'
const logger = getLogger('saga/buyProduct')

describe('ゲストが商品を購入する', () => {
  const buyProduct = { selectAd, listRecommendProducts } as const

  it('正常系', async () => {
    const naviEvent = await selectAd({ eventType: 'AdSelect', fromType: 'iphone' })
    expect(naviEvent).not.toBeNull()

    const products = await listRecommendProducts({ keyword: 'hogefuga' })
    expect(products).not.toBeNull()
  })

  type QueryEvent = { q: string; unsave?: boolean }
  type CommandEvent = { c: string; unsave?: boolean }

  type AllEvent = QueryEvent | CommandEvent

  type AllEventRes = { logId?: Ulid }

  type Usecases = { [P: string]: (e: AllEvent) => Promise<AllEventRes> }

  const execSaga = async (saga: Usecases, testParams: PickUsecasesTestParams<Usecases>) => {
    const results = _.map(saga, async (f, name) => {
      const param = _.get(testParams, name)

      // console.log(name, param)

      return { expected: param[1], actual: await f(param[0] as AllEvent) }
    })

    return await Promise.all(results)
  }

  it('正常系 in-out', async () => {
    const testParams: PickUsecasesTestParams<typeof buyProduct> = {
      selectAd: [{ eventType: 'AdSelect' }, { eventType: 'AdToPurchaseNavi' }],
      listRecommendProducts: [{ keyword: '' }, [{ productId: '1' }, { productId: '2' }]],
    }

    const results = await execSaga(buyProduct, testParams)

    results.forEach((res) => {
      console.log('res=', res)
      expect(res.actual).toMatchObject(res.expected)
    })

    // Object.keys(buyProduct).map((key) => {
    //   Object.geset.selectAd
    // })
    // const naviEvent = await selectAd({ eventType: 'AdSelect', fromType: 'iphone' })
    // expect(naviEvent).not.toBeNull()

    // const products = await listRecommendProducts({ keyword: 'hogefuga' })
    // expect(products).not.toBeNull()
  })
})
