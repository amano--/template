import { GuestAccount, Ulid, UserAccount } from '@me/common'

import { getLogger } from 'log4js'
import { MockUserAccountIdType } from '@me/mocks'
import { ResponseEvent } from '../../common/src/common'
import { Temporal } from '@js-temporal/polyfill'
const logger = getLogger('domains/purchase')

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type ProductId = MockUserAccountIdType
export type Product = { productId: ProductId }

export type PurchaseStartEvent = { c: 'PurchaseStart'; fromType: 'ad' | 'bookmark' }

// export type ItemSelected = { commandType: 'ItemSelected'; itemId: Ulid }

export type ListProductsInput = { keyword: string }

export type ListProductsEvent = { q: 'ListProducts'; input: ListProductsInput }

export type CartAddEvent = { c: 'CartAdd'; productId: ProductId } //save: 'batch';
export type CartAddEventLog = CartAddEvent & { logId: Ulid }
export type CartAddSuccessEvent = ResponseEvent & { r: 'CartAddSuccess'; rt: 'success' }
export type CartAddProductOutOfStockEvent = ResponseEvent & {
  r: 'CartAddProductOutOfStock'
  rt: 'alt'
  list: Product[]
}

export type CartSettleEvent = { c: 'CartSettle'; account: UserAccount | GuestAccount; list: readonly Product[] }

export type CartSettleSuccessEvent = ResponseEvent & { r: 'CartSettleSuccess'; rt: 'success' }

// TBD 上記の汎用的なエラーではなく、エラーを詳細に把握させたい場合のやり方の検証用イベント
export type CartSettleFailByInsufficientFundsEvent = ResponseEvent & {
  r: 'CartSettleFailByInsufficientFunds'
  rt: 'exception'
  // 差額
  differenceAmount: number
}

export type CartSettleFailByCardExpiredEvent = ResponseEvent & {
  r: 'CartSettleFailByCardExpired'
  rt: 'exception'
  // TBD Temporal の日付型を検証するためあまり意味のないプロパティを設定してみたｗ
  oldDate: Temporal.ZonedDateTime
}

export type CartSettleEtcFailEvent = ResponseEvent & { r: 'CartSettleEtcFail'; rt: 'exception' }

export type NaviToUserEntryEvent = ResponseEvent & {
  r: 'NaviToUserEntry'
  rt: 'alt'
  // TBD domain層から 外側のインフラ層の情報を返すことの是非
  path: string
  callBy: { settleCart: CartSettleEvent }
}

export type PurchaseEventLog = CartAddEventLog
export type PurchaseCommandEvent = CartAddEvent | CartSettleEvent
export type PurchaseQueryEvent = ListProductsEvent
export type PurchaseEvent = PurchaseCommandEvent | PurchaseQueryEvent
