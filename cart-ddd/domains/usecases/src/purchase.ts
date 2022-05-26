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
import { commonFinder } from '../../common/src/common'
const logger = getLogger('usecases/purchase')

export const listRecommendProducts = async (e: ListProductsEvent) => {
  logger.info('listRecommendProducts :', 'e :', e)

  const products = await purchaseApi.listProducts(e.input)

  logger.info('listRecommendProducts :', 'products=', products)

  return Promise.resolve<QuerySuccessEvent<Product>>({
    r: 'QuerySuccess',
    rt: 'success',
    msg: commonFinder.querySuccess,
    list: products,
  })
}

export const addCart = async (e: CartAddEvent) => {
  logger.info('addCart :', 'e=', e)
  const counts = await purchaseApi.findProductStock([e.productId])

  if (!counts.some((v) => v.count === 0)) {
    return Promise.resolve<CartAddSuccessEvent>({
      r: 'CartAddSuccess',
      rt: 'success',
    })
  }

  const products = await purchaseApi.listRelatedProducts([e.productId])

  return Promise.resolve<CartAddProductOutOfStockEvent>({
    r: 'CartAddProductOutOfStock',
    rt: 'alt',
    list: products,
  })
}

export const settleCart = async (e: CartSettleEvent) => {
  logger.info('settleCart :', 'e=', e)

  if (isGuest(e.account)) {
    return Promise.resolve<NaviToUserEntryEvent>({
      r: 'NaviToUserEntry',
      rt: 'alt',
      path: '/user/account/entry',
      callBy: { settleCart: e },
    })
  }

  return await purchaseApi.settleCart({ ...e, account: e.account })
}
