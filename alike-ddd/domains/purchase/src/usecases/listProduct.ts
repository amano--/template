import { newListQuerySuccessEvent, assignLogger, UserLank } from '@alike-ddd/common'

import { apiPurchase } from '../index'

const logger = assignLogger('domains/purchase/usecases/listProduct')

export type ListRecommendProductsInput = { lank?: UserLank }

type ListRecommendProductsEvent = { q: 'ListRecommendProducts'; input: ListRecommendProductsInput }

export const listRecommendProducts = async (e: ListRecommendProductsEvent) => {
  logger.info('listRecommendProducts :', 'e :', e)

  const products = await apiPurchase.listProducts(e.input)

  logger.info('listRecommendProducts : ', 'products=', products)

  return Promise.resolve(newListQuerySuccessEvent(products))
}
