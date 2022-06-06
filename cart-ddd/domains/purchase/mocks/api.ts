import { UserAccount } from '@alike-ca/common'
import { Product, ProductId, CartSettleEvent, ListRecommendProductsInput } from '../src/index'

import { getLogger } from 'log4js'
import { apiSettle, newSettleEvent } from '@alike-ca/settle'
import { MockProducts } from './products'
const logger = getLogger('purchase/mocks/api')

const mutations = {
  // saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
  //   logger.info('saveEvent: ', 'e=', e)

  //   return Promise.resolve({
  //     ...e,
  //     logId: newLogId(),
  //   })
  // },

  // TODO UserAccount | GuestAccount から GuestAccount のうまい抜き方の調査
  // settleCart: (e: Omit<CartSettleEvent, 'account'> & { account: UserAccount })
  settleCart: (e: CartSettleEvent & { account: UserAccount }) => {
    logger.info('settleCart: ', 'e=', e)

    // TODO 消費税の計算
    // TODO ユーザー属性ごとの計算
    // TODO できれば通貨レートの反映
    // TODO 今は適当に合計金額を算出

    const total = e.list.reduce((sum) => sum + 1111, 0)

    return apiSettle.settle(newSettleEvent({ settleAccountId: e.account.userId }, total))
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

  listProducts: async (input: ListRecommendProductsInput): Promise<Product[]> => {
    logger.info('listProducts: ', 'input=', input)

    return Promise.resolve(Object.values([MockProducts.normal, MockProducts.relate1]))
  },

  listRelatedProducts: async (input: [ProductId]): Promise<Product[]> => {
    logger.info('listRelatedProducts : input=', input)

    return Promise.resolve(Object.values([MockProducts.relate1, MockProducts.relate2]))
  },
}

export const purchaseApiMock = { ...mutations, ...queries }
