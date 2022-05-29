import { stripeApiMock } from './stripe/api'

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
const logger = getLogger('mocks/settle/index')

export type RawSettleProviderId = 'stripe'
export type RawSettleAccount = { settleAccountId: string }
export type RawMoney = { currency: 'USD' | 'JPY'; amount: number }

export type RawSettleEvent = {
  c: 'RawSettle'
  provider: RawSettleProviderId
  account: RawSettleAccount
  price: RawMoney
}

export type RawSettleSuccessEvent = ResponseCommandSuccessEvent & {
  r: 'RawSettleSuccess'
  provider: RawSettleProviderId
  rawLogId: string
}

export type RawSettleCardExpiredEvent = ResponseExceptionEvent & {
  r: 'RawSettleCardExpired'
  provider: RawSettleProviderId
  expireDate: Temporal.ZonedDateTime
}

export type RawSettleEtcExceptionEvent = ResponseExceptionEvent & {
  r: 'RawSettleEtcException'
  provider: RawSettleProviderId
  errorMessage: string
}

export const settleApiMock = stripeApiMock
