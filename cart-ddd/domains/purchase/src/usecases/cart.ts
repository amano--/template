import { purchaseApi, isGuest, newListQuerySuccessEvent } from '@me/common'
import {
  ListProductsEvent,
  CartAddEvent,
  CartSettleEvent,
  NaviToUserEntryEvent,
  newCartAddSuccessEvent,
  newCartAddProductOutOfStockEvent,
} from '../event'

import { getLogger } from 'log4js'

//const logger = getLogger(__filename)
const logger = getLogger('domains/purchase/usecases/cart')

export const listRecommendProducts = async (e: ListProductsEvent) => {
  logger.info('listRecommendProducts :', 'e :', e)

  const products = await purchaseApi.listProducts(e.input)

  logger.info('listRecommendProducts : ', 'products=', products)

  return Promise.resolve(newListQuerySuccessEvent(products))
  //   <QuerySuccessEvent<Product>>({
  //   r: 'QuerySuccess',
  //   rt: 'success',
  //   msg: messageFindersForCommon.querySuccess,
  //   list: products,
  // })
}

export const addCart = async (e: CartAddEvent) => {
  logger.info('addCart :', 'e=', e)
  const counts = await purchaseApi.findProductStock([e.productId])

  // 品切れ状態の商品でなかったら成功
  if (counts.findIndex((v) => v.count === 0) < 0) {
    return Promise.resolve(newCartAddSuccessEvent())
  }

  // 品切れ状態の商品だった場合関連商品を表示
  const products = await purchaseApi.listRelatedProducts([e.productId])
  return Promise.resolve(newCartAddProductOutOfStockEvent(products))
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

  // if (false) {
  //   return Promise.resolve({ r: 'Hoge', rt: 'success', hoge: 'hoge' } as const)
  // }

  return await purchaseApi.settleCart({ ...e, account: e.account })
}
