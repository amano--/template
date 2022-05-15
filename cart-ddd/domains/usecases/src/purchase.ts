import { ListProductsInput, Product } from '@me/purchase'

import { getLogger } from 'log4js'
import { purchaseApi } from '../../purchase/src/index'
const logger = getLogger('usecases/purchase')

export const listRecommendProducts = async (input: ListProductsInput): Promise<Product[]> => {
  logger.info('input :', input)

  const products = await purchaseApi.listProducts(input)

  logger.info('products=', products)

  return Promise.resolve(products)
}

// export const addToCart = async (e: ItemSelectEvent): Promise<AdToPurchaseNaviEvent> => {
//   logger.info('event :', e)
//   const log = await adApi.saveEvent(e)
//   logger.info('save log=', log)

//   return Promise.resolve({
//     eventType: 'AdToPurchaseNavi',
//     fromType: e.fromType,
//     naviToPurchaseUrl: '/purchase',
//   })
// }
