import { AllEvent, QuerySuccessEvent, purchaseApi } from '@me/common'
import {
  ListProductsInput,
  ListProductsEvent,
  CartAddEvent,
  Product,
  CartAddSuccessEvent,
  CartAddProductOutOfStockEvent,
  CartSettleEvent,
  CartSettleSuccessEvent,
} from '@me/purchase'

import { getLogger } from 'log4js'
import { CartSettleFailEvent } from '../../purchase/src/index'
const logger = getLogger('usecases/purchase')

export const listRecommendProducts = async (e: ListProductsEvent) => {
  logger.info('event :', e)

  const products = await purchaseApi.listProducts(e.input)

  logger.info('products=', products)

  return Promise.resolve<QuerySuccessEvent<Product>>({ r: 'QuerySuccess', list: products })
}

export const addCart = async (e: CartAddEvent) => {
  logger.info('event :', e)
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
  logger.info('event :', e)
  const log = await purchaseApi.settleCart(e)

  return Promise.resolve<CartSettleSuccessEvent | CartSettleFailEvent>({
    r: 'CartSettleSuccess',
  })
}