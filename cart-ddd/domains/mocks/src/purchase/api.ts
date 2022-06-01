import { newLogId, UserAccount, settleApi } from '@me/common'
import { Product, PurchaseCommandEvent, ProductId, ListProductsInput, CartSettleEvent } from '@me/purchase'

import { getLogger } from 'log4js'
import { newSettleEvent, SettleEvent } from '../settle/index'
const logger = getLogger('mocks/purchase/api')

const simpleProducts = { normal: { productId: 'normal' }, outOfStock: { productId: 'outOfStock' } } as const
const relatedProducts = { relate1: { productId: 'relate1' }, relate2: { productId: 'relate2' } } as const

// [ TypeScript で string 型の値に自動補完を効かせる ](https://nanto.asablo.jp/blog/2021/09/11/9422241)
export const MockProducts = { ...simpleProducts, ...relatedProducts } as const
/**
 * normal - 普通の商品。
 * outOfStock - 品切れ状態の商品
 * relate1 - 関連商品 例1
 * relate２ - 関連商品 例2
 */
export type MockProductIdType = keyof typeof MockProducts | (string & {})

const mutations = {
  saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
    logger.info('saveEvent: ', 'e=', e)

    return Promise.resolve({
      ...e,
      logId: newLogId(),
    })
  },

  // TODO UserAccount | GuestAccount から GuestAccount のうまい抜き方の調査
  // settleCart: (e: Omit<CartSettleEvent, 'account'> & { account: UserAccount })
  settleCart: (e: CartSettleEvent & { account: UserAccount }) => {
    logger.info('settleCart: ', 'e=', e)

    // TODO 消費税の計算
    // TODO ユーザー属性ごとの計算
    // TODO できれば通貨レートの反映
    // TODO 今は適当に合計金額を算出

    const total = e.list.reduce((sum) => sum + 1111, 0)

    return settleApi.settle(newSettleEvent({ settleAccountId: e.account.userId }, total))
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
