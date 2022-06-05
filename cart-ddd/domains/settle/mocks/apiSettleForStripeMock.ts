import { newLogId } from '@me/common'

import { Temporal } from '@js-temporal/polyfill'
import { getLogger } from 'log4js'
import { CARD_EXPIRE_DATE } from './constants'
import { SettleEtcExceptionEvent, SettleSuccessEvent } from '../src/types'
import { SettleEvent, SettleFailByCardExpiredEvent, SettleFailByInsufficientFundsEvent } from '../src/types'

const logger = getLogger('settle/mocks/stripe/api') //
// type StripeSettleEvent = SettleEvent
// type StripeSettleSuccessEvent = SettleSuccessEvent

// type StripeSettleCardExpiredEvent = SettleFailByCardExpiredEvent

const mutations = {
  // saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
  //   logger.info('saveEvent: ', 'e=', e)
  //   return Promise.resolve({
  //     ...e,
  //     logId: newLogId(),
  //   })
  // },
  settle: (e: SettleEvent) => {
    logger.info('settle: ', 'e=', e)
    //TODO 今は適当に実装
    if (e.account.settleAccountId === 'poor') {
      return Promise.resolve<SettleFailByInsufficientFundsEvent>({
        r: 'SettleFailByInsufficientFunds',
        rt: 'exception',
        provider: 'stripe',
        rawLogId: newLogId(),
        differenceAmount: 999,
      })
    }

    if (e.account.settleAccountId === 'cardExpired') {
      return Promise.resolve<SettleFailByCardExpiredEvent>({
        r: 'SettleFailByCardExpired',
        rt: 'exception',
        provider: 'stripe',
        rawLogId: newLogId(),

        expireDate: Temporal.ZonedDateTime.from(CARD_EXPIRE_DATE),
      })
    }

    //TODO 後で分岐を実装
    const fail = false
    if (fail) {
      return Promise.resolve<SettleEtcExceptionEvent>({
        r: 'SettleEtcException',
        rt: 'exception',
        provider: 'stripe',

        errorMessage: 'etc error',
      })
    }

    return Promise.resolve<SettleSuccessEvent>({
      r: 'SettleSuccess',
      rt: 'success',
      provider: 'stripe',
      rawLogId: newLogId(),
      logId: newLogId(),
    })
  },
  // const fail = false
  // if (fail) {
  //   return Promise.resolve<SettleFailByCardExpiredEvent>({
  //     r: 'SettleFailByCardExpired',
  //     rt: 'exception',
  //     provider: 'stripe',
  //           rawLogId: newLogId(),

  //     expireDate: Temporal.ZonedDateTime.from(CARD_EXPIRE_DATE),
  //   })
  // }

  // return Promise.resolve<SettleFailByInsufficientFundsEvent>({
  //   r: 'SettleFailByInsufficientFunds',
  //   rt: 'exception',
  //   provider: 'stripe',
  //   rawLogId: newLogId(),
  //   differenceAmount:999
  // })
  // },
}

const queries = {}

export const apiSettleMockForStripe = { ...mutations, ...queries } as const
