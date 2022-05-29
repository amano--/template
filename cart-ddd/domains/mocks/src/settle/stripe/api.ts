import { newLogId, ResponseCommandSuccessEvent, ResponseExceptionEvent, UserAccount } from '@me/common'
import {
  CartSettleEvent,
  CartSettleSuccessEvent,
  CartSettleEtcFailEvent,
  CartSettleFailByInsufficientFundsEvent,
  CartSettleFailByCardExpiredEvent,
} from '@me/purchase'

import { Temporal } from '@js-temporal/polyfill'
import { getLogger } from 'log4js'
import { CARD_EXPIRE_DATE } from '../..'
const logger = getLogger('mocks/settle/stripe/api')

type StripeAccount = {}
type Money = { amount: number }

type StripeSettleEvent = { c: 'StripeSettle'; account: StripeAccount; price: Money }

type StripeSettleSuccessEvent = ResponseCommandSuccessEvent & { r: 'StripeSettleSuccess'; logIdByStripe: string }

type StripeCardExpiredEvent = ResponseExceptionEvent & {
  r: 'StripeCardExpired'
  expireDate: Temporal.ZonedDateTime
}

const mutations = {
  // saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
  //   logger.info('saveEvent: ', 'e=', e)
  //   return Promise.resolve({
  //     ...e,
  //     logId: newLogId(),
  //   })
  // },
  settle: (e: StripeSettleEvent) => {
    logger.info('settle: ', 'e=', e)
    //TODO 今は適当に実装
    const fail = false
    if (fail) {
      return Promise.resolve<StripeCardExpiredEvent>({
        r: 'StripeCardExpired',
        rt: 'exception',
        expireDate: Temporal.ZonedDateTime.from(CARD_EXPIRE_DATE),
      })
    }

    return Promise.resolve<StripeSettleSuccessEvent>({
      r: 'StripeSettleSuccess',
      rt: 'success',
      logIdByStripe: newLogId(),
      logId: newLogId(),
    })
  },
}

const queries = {
  // findProductStock: async (input: [ProductId]): Promise<{ count: number }[]> => {
  //   logger.info('findProductStock: ', 'input=', input)
  //   const results = input.map((id) => {
  //     // 品切れ状態の設定
  //     if (id === 'outOfStock') {
  //       return { count: 0 }
  //     }
  //     return { count: 3 }
  //   })
  //   return Promise.resolve(results)
  // },
  // listProducts: async (input: ListProductsInput): Promise<Product[]> => {
  //   logger.info('listProducts: ', 'input=', input)
  //   return Promise.resolve(Object.values(simpleProducts))
  // },
  // listRelatedProducts: async (input: [ProductId]): Promise<Product[]> => {
  //   logger.info('listRelatedProducts : input=', input)
  //   return Promise.resolve(Object.values(relatedProducts))
  // },
}

export const stripeApiMock = { ...mutations, ...queries }
