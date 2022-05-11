export type Ulid = string

export type PurchaseStartEvent = { eventType: 'PurchaseStart'; fromType: 'ad' | 'bookmark' }

export type ItemSelected = { commandType: 'ItemSelected'; itemId: Ulid }

export const purchaseMock = 'purchaseMock'
