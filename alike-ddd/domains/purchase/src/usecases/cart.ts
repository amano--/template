import {
  isGuest,
  newListQuerySuccessEvent,
  Ulid,
  ResponseSuccessEvent,
  ResponseAltEvent,
  UserAccount,
  GuestAccount,
  ResponseCommandSuccessEvent,
  ResponseExceptionEvent,
  ResponseNaviEvent,
  assignLogger,
} from '@alike-ddd/common'
import { Temporal } from '@js-temporal/polyfill'

import { Product, ProductId, apiPurchase } from '../index'
import { messageFindersForPurchase } from '../messages'

const logger = assignLogger('domains/purchase/usecases/cart')

export type ListRecommendProductsInput = { keyword: string }

type ListRecommendProductsEvent = { q: 'ListRecommendProducts'; input: ListRecommendProductsInput }

type CartAddEvent = { c: 'CartAdd'; productId: ProductId } //save: 'batch';
type CartAddEventLog = CartAddEvent & { logId: Ulid }
// type CartAddSuccessEvent = ResponseSuccessEvent & { r: 'CartAddSuccess' }
type CartAddSuccessEvent = ResponseSuccessEvent & {
  r: 'CartAddSuccess'
  message: typeof messageFindersForPurchase.cartAddSuccess
}

const defaultCartAddSuccessEvent = {
  r: 'CartAddSuccess',
  rt: 'success',
  message: messageFindersForPurchase.cartAddSuccess,
} as const

const newCartAddSuccessEvent = (): CartAddSuccessEvent => defaultCartAddSuccessEvent

type CartAddProductOutOfStockEvent = ResponseAltEvent & {
  r: 'CartAddProductOutOfStock'
  list: Product[]
}

const newCartAddProductOutOfStockEvent = (list: Product[]): CartAddProductOutOfStockEvent => ({
  r: 'CartAddProductOutOfStock',
  rt: 'alt',
  list,
})

export type CartSettleEvent = { c: 'CartSettle'; account: UserAccount | GuestAccount; list: readonly Product[] }

type NaviToUserEntryEvent = ResponseNaviEvent & {
  r: 'NaviToUserEntry'
  // rt: 'alt'
  // TBD domain層から 外側のインフラ層の情報を返すことの是非
  // path: string
  callBy: { settleCart: CartSettleEvent }
}

export const listRecommendProducts = async (e: ListRecommendProductsEvent) => {
  logger.info('listRecommendProducts :', 'e :', e)

  const products = await apiPurchase.listProducts(e.input)

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
  const counts = await apiPurchase.findProductStock([e.productId])

  // 品切れ状態の商品がなかったら成功
  if (counts.findIndex((v) => v.count === 0) < 0) {
    return Promise.resolve(newCartAddSuccessEvent())
  }

  // 品切れ状態の商品だった場合関連商品を表示
  const products = await apiPurchase.listRelatedProducts([e.productId])
  return Promise.resolve(newCartAddProductOutOfStockEvent(products))
}

export const settleCart = async (e: CartSettleEvent) => {
  logger.info('settleCart :', 'e=', e)

  if (isGuest(e.account)) {
    return Promise.resolve<NaviToUserEntryEvent>({
      r: 'NaviToUserEntry',
      rt: 'navi',
      viewId: 'UserCreateAccount',
      // path: '/user/account/entry',
      callBy: { settleCart: e },
    })
  }

  // if (false) {
  //   return Promise.resolve({ r: 'Hoge', rt: 'success', hoge: 'hoge' } as const)
  // }

  return await apiPurchase.settleCart({ ...e, account: e.account })
}
