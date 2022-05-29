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
import { CARD_EXPIRE_DATE } from '../../constants'
import { RawSettleEvent, RawSettleSuccessEvent, RawSettleCardExpiredEvent } from '../index'
const logger = getLogger('mocks/settle/stripe/api')

type StripeSettleEvent = RawSettleEvent
type StripeSettleSuccessEvent = RawSettleSuccessEvent

type StripeSettleCardExpiredEvent = RawSettleCardExpiredEvent

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
      return Promise.resolve<StripeSettleCardExpiredEvent>({
        r: 'RawSettleCardExpired',
        rt: 'exception',
        provider: 'stripe',
        expireDate: Temporal.ZonedDateTime.from(CARD_EXPIRE_DATE),
      })
    }

    return Promise.resolve<StripeSettleSuccessEvent>({
      r: 'RawSettleSuccess',
      rt: 'success',
      provider: 'stripe',
      rawLogId: newLogId(),
      logId: newLogId(),
    })
  },
}

const queries = {}

export const stripeApiMock = { ...mutations, ...queries }
