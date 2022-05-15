import { selectAd } from '../selectAd'
import { listRecommendProducts } from '../purchase'

import { getLogger } from 'log4js'
const logger = getLogger('saga/buyProduct')

describe('ゲストが商品を購入する', () => {
  it('正常系', async () => {
    const naviEvent = await selectAd({ eventType: 'AdSelect', fromType: 'iphone' })
    expect(naviEvent).not.toBeNull()

    const products = await listRecommendProducts({ keyword: 'hogefuga' })
    expect(products).not.toBeNull()
  })
})

