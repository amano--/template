import { purchaseApi } from '@me/common'
import { ListProductsInput, Product } from '@me/purchase'

import { getLogger } from 'log4js'
import { ListProductsEvent } from '../../purchase/src/index'
const logger = getLogger('usecases/purchase')

export const listRecommendProducts = async (e: ListProductsEvent): Promise<{ list: Product[] }> => {
  logger.info('e :', e)

  const products = await purchaseApi.listProducts(e.input)

  logger.info('products=', products)

  return Promise.resolve({ list: products })
}

export const addToCart = async (e: AddToCartEvent): Promise<AllEEvent> => {
  logger.info('event :', e)
  const log = await adApi.saveEvent(e)
  logger.info('save log=', log)

  return Promise.resolve({
    eventType: 'AdToPurchaseNavi',
    fromType: e.fromType,
    naviToPurchaseUrl: '/purchase',
  })
}
