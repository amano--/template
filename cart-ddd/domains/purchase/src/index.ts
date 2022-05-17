import { Ulid } from '@me/common'

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
export type CartAddSuccessEvent = { e: 'CartAddSuccess' }
export type CartAddProductOutOfStockEvent = { e: 'CartAddProductOutOfStock'; list: Product[] }

export type CartSettleEvent = { c: 'CartSettle' }
export type CartSettleSuccessEvent = { e: 'CartSettleSuccess' }
export type CartSettleFailEvent = { e: 'CartSettleFail' }

export type PurchaseEventLog = CartAddEventLog
export type PurchaseCommandEvent = CartAddEvent | CartSettleEvent
export type PurchaseQueryEvent = ListProductsEvent
export type PurchaseEvent = PurchaseCommandEvent | PurchaseQueryEvent
