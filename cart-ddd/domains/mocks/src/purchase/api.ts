import { newLogId } from '@me/common'
import {
  Product,
  PurchaseCommandEvent,
  CartSettleEvent,
  ProductId,
  CartSettleSuccessEvent,
  CartSettleFailEvent,
  ListProductsInput,
} from '@me/purchase'

import { getLogger } from 'log4js'
const logger = getLogger('mocks/purchase/api')

const simpleProducts = { normal: { productId: 'normal' }, outOfStock: { productId: 'outOfStock' } } as const
const relatedProducts = { relate1: { productId: 'relate1' }, relate2: { productId: 'relate2' } } as const

// [ TypeScript で string 型の値に自動補完を効かせる ](https://nanto.asablo.jp/blog/2021/09/11/9422241)
const allMockProducts = { ...simpleProducts, ...relatedProducts } as const
export type MockProductIdType = keyof typeof allMockProducts | (string & {})

const mutations = {
  saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
    logger.info('saveEvent: ', 'e=', e)

    return Promise.resolve({
      ...e,
      logId: newLogId(),
    })
  },

  settleCart: (e: CartSettleEvent) => {
    logger.info('settleCart: ', 'e=', e)

    //TODO 後で分岐を実装
    const fail = false
    if (fail) {
      return Promise.resolve<CartSettleFailEvent>({
        r: 'CartSettleFail',
      })
    }

    return Promise.resolve<CartSettleSuccessEvent>({
      r: 'CartSettleSuccess',
      logId: newLogId(),
    })
  },
}

const queries = {
  findProductStock: async (input: [ProductId]): Promise<{ count: number }[]> => {
    logger.info('findProductStock: ', 'input=', input)

    const results = input.map((id) => {
      // 品切れ状態の設定
      if (id === 'outOfStock') {
        return { count: 0 }
      }
      return { count: 3 }
    })

    return Promise.resolve(results)
  },

  listProducts: async (input: ListProductsInput): Promise<Product[]> => {
    logger.info('listProducts: ', 'input=', input)

    return Promise.resolve(Object.values(simpleProducts))
  },

  listRelatedProducts: async (input: [ProductId]): Promise<Product[]> => {
    logger.info('listRelatedProducts : input=', input)

    return Promise.resolve(Object.values(relatedProducts))
  },
}

export const purchaseApiMock = { ...mutations, ...queries }
