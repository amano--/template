import { assignLogger } from '@alike-ddd/common'
import { MockProductIdType } from '../mocks'

const logger = assignLogger('domains/purchase')

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type ProductId = MockProductIdType
export type Product = { productId: ProductId }

export type PurchaseStartEvent = { c: 'PurchaseStart'; fromType: 'ad' | 'bookmark' }

// export type ItemSelected = { commandType: 'ItemSelected'; itemId: Ulid }

// export type PurchaseEventLog = CartAddEventLog
// export type PurchaseCommandEvent = CartAddEvent | CartSettleEvent
// export type PurchaseQueryEvent = ListProductsEvent
// export type PurchaseEvent = PurchaseCommandEvent | PurchaseQueryEvent
