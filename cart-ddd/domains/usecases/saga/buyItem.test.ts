import { selectAd } from '~/selectAd'
import { listRecommendProducts } from '~/purchase'

import { getLogger } from 'log4js'
const logger = getLogger('saga/buyItem')

describe('ゲストが商品を購入する', () => {
  it('正常系', async () => {
    const naviEvent = await selectAd({ eventType: 'AdSelect', fromType: 'iphone' })

    const products = await listRecommendProducts({ keyword: 'hogefuga' })

    console.log(products)
    expect(products).not.toBeNull()
  })
})
