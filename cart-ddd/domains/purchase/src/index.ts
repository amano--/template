import { GuestAccount, Ulid, UserAccount } from '@me/common'

import { getLogger } from 'log4js'
const logger = getLogger('domains/purchase')

export type ProductId = string
export type Product = { productId: ProductId }

export type PurchaseStartEvent = { c: 'PurchaseStart'; fromType: 'ad' | 'bookmark' }

// export type ItemSelected = { commandType: 'ItemSelected'; itemId: Ulid }

export type ListProductsInput = { keyword: string }

export type ListProductsEvent = { q: 'ListProducts'; input: ListProductsInput }

export type CartAddEvent = { c: 'CartAdd'; productId: ProductId } //save: 'batch';
export type CartAddEventLog = CartAddEvent & { logId: Ulid }
export type CartAddSuccessEvent = { r: 'CartAddSuccess' }
export type CartAddProductOutOfStockEvent = { r: 'CartAddProductOutOfStock'; list: Product[] }

export type CartSettleEvent = { c: 'CartSettle'; account: UserAccount | GuestAccount; list: Product[] }

export type CartSettleSuccessEvent = { r: 'CartSettleSuccess'; logId: Ulid }
export type CartSettleFailEvent = { r: 'CartSettleFail' }
export type NaviToUserEntryEvent = {
  r: 'NaviToUserEntry'
  path: string
  callBy: { settleCart: CartSettleEvent }
}

export type PurchaseEventLog = CartAddEventLog
export type PurchaseCommandEvent = CartAddEvent | CartSettleEvent
export type PurchaseQueryEvent = ListProductsEvent
export type PurchaseEvent = PurchaseCommandEvent | PurchaseQueryEvent
