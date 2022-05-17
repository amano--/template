import { newLogId } from '@me/common'
import { ListProductsInputEvent, Product, PurchaseCommandEvent, CartSettleEvent, ProductId } from '@me/purchase'

import { getLogger } from 'log4js'
const logger = getLogger('mocks/purchase/api')

const simpleProducts = [{ productId: 'normal' }, { productId: 'outOfStock' }]
const relatedProducts = [{ productId: '5' }, { productId: '6' }]

const mutations = {
  saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
    logger.info('saveEvent : event=', e)

    return Promise.resolve({
      ...e,
      logId: newLogId(),
    })
  },

  settleCart: (e: CartSettleEvent): Promise<PurchaseEventLog> => {
    logger.info('saveEvent : event=', e)

    return Promise.resolve({
      ...e,
      logId: newLogId(),
    })
  },
}

const queries = {
  findProductStock: async (input: [ProductId]): Promise<{ count: number }[]> => {
    logger.info('findProductStock : input=', input)

    const results = input.map((id) => {
      // 品切れ状態の設定
      if (id === 'outOfStock') {
        return { count: 0 }
      }
      return { count: 3 }
    })

    return Promise.resolve(results)
  },

  listProducts: async (input: ListProductsInputEvent): Promise<Product[]> => {
    logger.info('listProducts : input=', input)

    return Promise.resolve(simpleProducts)
  },

  listRelatedProducts: async (input: [ProductId]): Promise<Product[]> => {
    logger.info('listRelatedProducts : input=', input)

    return Promise.resolve(relatedProducts)
  },
}

export const purchaseApiMock = { ...mutations, ...queries }
