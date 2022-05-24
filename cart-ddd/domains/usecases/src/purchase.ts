import { AllEvent, QuerySuccessEvent, purchaseApi, isGuest } from '@me/common'
import {
  ListProductsInput,
  ListProductsEvent,
  CartAddEvent,
  Product,
  CartAddSuccessEvent,
  CartAddProductOutOfStockEvent,
  CartSettleEvent,
  CartSettleSuccessEvent,
  NaviToUserEntryEvent,
} from '@me/purchase'

import { getLogger } from 'log4js'
const logger = getLogger('usecases/purchase')

export const listRecommendProducts = async (e: ListProductsEvent) => {
  logger.info('event :', e)

  const products = await purchaseApi.listProducts(e.input)

  logger.info('products=', products)

  return Promise.resolve<QuerySuccessEvent<Product>>({ r: 'QuerySuccess', list: products })
}

export const addCart = async (e: CartAddEvent) => {
  logger.info('addCart :', 'e=', e)
  const counts = await purchaseApi.findProductStock([e.productId])

  if (!counts.some((v) => v.count === 0)) {
    return Promise.resolve<CartAddSuccessEvent>({
      r: 'CartAddSuccess',
    })
  }

  const products = await purchaseApi.listRelatedProducts([e.productId])

  return Promise.resolve<CartAddProductOutOfStockEvent>({
    r: 'CartAddProductOutOfStock',
    list: products,
  })
}

export const settleCart = async (e: CartSettleEvent) => {
  logger.info('settleCart :', 'e=', e)

  if (isGuest(e.account)) {
    return Promise.resolve<NaviToUserEntryEvent>({
      r: 'NaviToUserEntry',
      path: '/user/account/entry',
      callBy: { settleCart: e },
    })
  }

  return await purchaseApi.settleCart(e)
}
