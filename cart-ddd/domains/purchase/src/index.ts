import { getLogger } from 'log4js'
import { Ulid, newLogId } from '@me/common'
import { simpleProducts } from '@me/mocks'

const logger = getLogger('domains/purchase')

export type PurchaseStartEvent = { c: 'PurchaseStart'; fromType: 'ad' | 'bookmark' }

// export type ItemSelected = { commandType: 'ItemSelected'; itemId: Ulid }

export type ListProductsInput = { keyword: string }

export type ListProductsEvent = { q: 'ListProducts'; input: ListProductsInput }

export type AddCartEvent = { c: 'AddCart'; productId: string } //save: 'batch';
export type AddCartEventLog = AddCartEvent & { logId: Ulid }

export type PurchaseCommandEvent = AddCartEvent
export type PurchaseQueryEvent = ListProductsEvent

export type PurchaseEvent = PurchaseCommandEvent | PurchaseQueryEvent

export type PurchaseEventLog = AddCartEventLog

const mutations = {
  saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
    logger.info('saveEvent : event=', e)

    return Promise.resolve({
      ...e,
      logId: newLogId(),
    })
  },
}

const queries = {
  listProducts: (input: ListProductsInput) => {
    logger.info('listProducts : input=', input)

    return simpleProducts
  },
}

const purchaseApiMock = { ...mutations, ...queries }

// TODO apiの実装変換の方法の検討
export const purchaseApi = process.env.NODE_ENV === 'production' ? purchaseApiMock : purchaseApiMock
