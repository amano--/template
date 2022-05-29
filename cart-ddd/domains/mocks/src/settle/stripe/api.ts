import { newLogId } from '@me/common'

import { Temporal } from '@js-temporal/polyfill'
import { getLogger } from 'log4js'
import { CARD_EXPIRE_DATE } from '../../constants'
import { RawSettleEtcExceptionEvent, RawSettleSuccessEvent } from '../index'
import { RawSettleEvent, RawSettleFailByCardExpiredEvent, RawSettleFailByInsufficientFundsEvent } from '../index'

const logger = getLogger('mocks/settle/stripe/api')

// type StripeSettleEvent = RawSettleEvent
// type StripeSettleSuccessEvent = RawSettleSuccessEvent

// type StripeSettleCardExpiredEvent = RawSettleFailByCardExpiredEvent

const mutations = {
  // saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
  //   logger.info('saveEvent: ', 'e=', e)
  //   return Promise.resolve({
  //     ...e,
  //     logId: newLogId(),
  //   })
  // },
  settle: (e: RawSettleEvent) => {
    logger.info('settle: ', 'e=', e)
    //TODO 今は適当に実装
    if (e.account.settleAccountId === 'poor') {
      return Promise.resolve<RawSettleFailByInsufficientFundsEvent>({
        r: 'RawSettleFailByInsufficientFunds',
        rt: 'exception',
        provider: 'stripe',
        rawLogId: newLogId(),
        differenceAmount: 999,
      })
    }

    if (e.account.settleAccountId === 'cardExpired') {
      return Promise.resolve<RawSettleFailByCardExpiredEvent>({
        r: 'RawSettleFailByCardExpired',
        rt: 'exception',
        provider: 'stripe',
        rawLogId: newLogId(),

        expireDate: Temporal.ZonedDateTime.from(CARD_EXPIRE_DATE),
      })
    }

    //TODO 後で分岐を実装
    const fail = false
    if (fail) {
      return Promise.resolve<RawSettleEtcExceptionEvent>({
        r: 'RawSettleEtcException',
        rt: 'exception',
        provider: 'stripe',

        errorMessage: 'etc error',
      })
    }

    return Promise.resolve<RawSettleSuccessEvent>({
      r: 'RawSettleSuccess',
      rt: 'success',
      provider: 'stripe',
      rawLogId: newLogId(),
      logId: newLogId(),
    })
  },
  // const fail = false
  // if (fail) {
  //   return Promise.resolve<RawSettleFailByCardExpiredEvent>({
  //     r: 'RawSettleFailByCardExpired',
  //     rt: 'exception',
  //     provider: 'stripe',
  //           rawLogId: newLogId(),

  //     expireDate: Temporal.ZonedDateTime.from(CARD_EXPIRE_DATE),
  //   })
  // }

  // return Promise.resolve<RawSettleFailByInsufficientFundsEvent>({
  //   r: 'RawSettleFailByInsufficientFunds',
  //   rt: 'exception',
  //   provider: 'stripe',
  //   rawLogId: newLogId(),
  //   differenceAmount:999
  // })
  // },
}

const queries = {}

export const stripeApiMock = { ...mutations, ...queries } as const
