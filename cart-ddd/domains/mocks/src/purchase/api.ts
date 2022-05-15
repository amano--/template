import { newLogId } from '@me/common'
import { ListProductsInput, Product, PurchaseCommandEvent, PurchaseEventLog } from '@me/purchase'

import { getLogger } from 'log4js'
const logger = getLogger('mocks/purchase/api')

export const simpleProducts = [{ productId: '1' }, { productId: '2' }]

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
  listProducts: async (input: ListProductsInput): Promise<Product[]> => {
    logger.info('listProducts : input=', input)

    return Promise.resolve(simpleProducts)
  },
}

export const purchaseApiMock = { ...mutations, ...queries }
