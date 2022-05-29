import { Temporal } from '@js-temporal/polyfill'
import {
  GuestAccount,
  Ulid,
  UserAccount,
  ResponseExceptionEvent,
  ResponseAltEvent,
  ResponseSuccessEvent,
  MockProductIdType,
  ResponseEventWithMessage,
  ResponseEvent,
} from '@me/common'

import { getLogger } from 'log4js'
import { messageFindersForPurchase } from './messages'
import { ResponseCommandSuccessEvent } from '../../common/src/event'
const logger = getLogger('domains/purchase')

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type ProductId = MockProductIdType
export type Product = { productId: ProductId }

export type PurchaseStartEvent = { c: 'PurchaseStart'; fromType: 'ad' | 'bookmark' }

// export type ItemSelected = { commandType: 'ItemSelected'; itemId: Ulid }

export type ListProductsInput = { keyword: string }

export type ListProductsEvent = { q: 'ListProducts'; input: ListProductsInput }

export type CartAddEvent = { c: 'CartAdd'; productId: ProductId } //save: 'batch';
export type CartAddEventLog = CartAddEvent & { logId: Ulid }
// export type CartAddSuccessEvent = ResponseSuccessEvent & { r: 'CartAddSuccess' }
export type CartAddSuccessEvent = ResponseSuccessEvent & {
  r: 'CartAddSuccess'
  message: typeof messageFindersForPurchase.cartAddSuccess
}

const defaultCartAddSuccessEvent = {
  r: 'CartAddSuccess',
  rt: 'success',
  message: messageFindersForPurchase.cartAddSuccess,
} as const

export const newCartAddSuccessEvent = (): CartAddSuccessEvent => defaultCartAddSuccessEvent

export type CartAddProductOutOfStockEvent = ResponseAltEvent & {
  r: 'CartAddProductOutOfStock'
  list: Product[]
}

export const newCartAddProductOutOfStockEvent = (list: Product[]): CartAddProductOutOfStockEvent => ({
  r: 'CartAddProductOutOfStock',
  rt: 'alt',
  list,
})

export type CartSettleEvent = { c: 'CartSettle'; account: UserAccount | GuestAccount; list: readonly Product[] }

export type CartSettleSuccessEvent = ResponseCommandSuccessEvent & { r: 'CartSettleSuccess' }

// TBD 上記の汎用的なエラーではなく、エラーを詳細に把握させたい場合のやり方の検証用イベント
export type CartSettleFailByInsufficientFundsEvent = ResponseExceptionEvent & {
  r: 'CartSettleFailByInsufficientFunds'
  // rt: 'exception'
  // 差額
  differenceAmount: number
}

export type CartSettleFailByCardExpiredEvent = ResponseExceptionEvent & {
  r: 'CartSettleFailByCardExpired'
  // rt: 'exception'
  // TBD Temporal の日付型を検証するためあまり意味のないプロパティを設定してみたｗ
  expireDate: Temporal.ZonedDateTime
}

export type CartSettleEtcFailEvent = ResponseExceptionEvent & { r: 'CartSettleEtcFail' }

export type NaviToUserEntryEvent = ResponseAltEvent & {
  r: 'NaviToUserEntry'
  // rt: 'alt'
  // TBD domain層から 外側のインフラ層の情報を返すことの是非
  path: string
  callBy: { settleCart: CartSettleEvent }
}

export type PurchaseEventLog = CartAddEventLog
export type PurchaseCommandEvent = CartAddEvent | CartSettleEvent
export type PurchaseQueryEvent = ListProductsEvent
export type PurchaseEvent = PurchaseCommandEvent | PurchaseQueryEvent
