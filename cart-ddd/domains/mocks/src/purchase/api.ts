import { newLogId, UserAccount, settleApi } from '@me/common'
import { Product, PurchaseCommandEvent, CartSettleEvent, ProductId, ListProductsInput } from '@me/purchase'

import { getLogger } from 'log4js'
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
  // settleCart: (e: Omit<CartSettleEvent, 'account'> & { account: UserAccount }) => {
  settleCart: (e: CartSettleEvent & { account: UserAccount }) => {
    logger.info('settleCart: ', 'e=', e)

    return settleApi.settle({
      c: 'RawSettle',
      account: e.account,
      provider: 'stripe',
      price: { currency: 'JPY', amount: 1122 },
    })
    // if (e.account.userId === 'poor') {
    //   return Promise.resolve<RawSettleFailByInsufficientFundsEvent>({
    //     r: 'RawSettleFailByInsufficientFunds',
    //     rt: 'exception',

    //     differenceAmount: 1,
    //   })
    // }

    // if (e.account.userId === 'cardExpired') {
    //   return Promise.resolve<CartSettleFailByCardExpiredEvent>({
    //     r: 'CartSettleFailByCardExpired',
    //     rt: 'exception',
    //     expireDate: Temporal.ZonedDateTime.from(CARD_EXPIRE_DATE),
    //   })
    // }

    // //TODO 後で分岐を実装
    // const fail = false
    // if (fail) {
    //   return Promise.resolve<CartSettleEtcFailEvent>({
    //     r: 'CartSettleEtcFail',
    //     rt: 'exception',
    //   })
    // }

    // return Promise.resolve<CartSettleSuccessEvent>({
    //   r: 'CartSettleSuccess',
    //   rt: 'success',
    //   logId: newLogId(),
    // })
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
