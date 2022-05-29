import { stripeApiMock } from './stripe/api'

import { Money, isMoney, newLogId, ResponseCommandSuccessEvent, ResponseExceptionEvent, UserAccount } from '@me/common'

import { Temporal } from '@js-temporal/polyfill'

import { getLogger } from 'log4js'
const logger = getLogger('mocks/settle/index')

export type RawSettleProviderId = 'stripe'
export type RawSettleAccount = { settleAccountId: string }
// export type RawMoney = { currency: 'USD' | 'JPY'; amount: number }

export type RawSettleEvent = {
  c: 'RawSettle'
  provider: RawSettleProviderId
  account: RawSettleAccount
  price: Money
}

export const newRawSettleEvent = (
  account: RawSettleAccount,
  price: Money | number,
  provider: RawSettleProviderId = 'stripe'
): RawSettleEvent => {
  return {
    c: 'RawSettle',
    provider: 'stripe',
    account,
    price: !isMoney(price) ? { currency: 'JPY', amount: price } : price,
  }
}

export type RawSettleSuccessEvent = ResponseCommandSuccessEvent & {
  r: 'RawSettleSuccess'
  provider: RawSettleProviderId
  rawLogId: string
}

export type RawSettleFailByCardExpiredEvent = ResponseExceptionEvent & {
  r: 'RawSettleFailByCardExpired'
  provider: RawSettleProviderId
  rawLogId: string
  expireDate: Temporal.ZonedDateTime
}

export type RawSettleFailByInsufficientFundsEvent = ResponseExceptionEvent & {
  r: 'RawSettleFailByInsufficientFunds'
  rt: 'exception'
  provider: RawSettleProviderId
  rawLogId: string
  // 差額
  differenceAmount: number
}

export type RawSettleEtcExceptionEvent = ResponseExceptionEvent & {
  r: 'RawSettleEtcException'
  provider: RawSettleProviderId
  errorMessage: string
}

// type CartSettleSuccessEvent = ResponseCommandSuccessEvent & { r: 'CartSettleSuccess' }

// // TBD 上記の汎用的なエラーではなく、エラーを詳細に把握させたい場合のやり方の検証用イベント
// type CartSettleFailByInsufficientFundsEvent = ResponseExceptionEvent & {
//   r: 'CartSettleFailByInsufficientFunds'
//   // rt: 'exception'
//   // 差額
//   differenceAmount: number
// }

// type CartSettleFailByCardExpiredEvent = ResponseExceptionEvent & {
//   r: 'CartSettleFailByCardExpired'
//   // rt: 'exception'
//   // TBD Temporal の日付型を検証するためあまり意味のないプロパティを設定してみたｗ
//   expireDate: Temporal.ZonedDateTime
// }

// // type CartSettleEtcFailEvent = ResponseExceptionEvent & { r: 'CartSettleEtcFail' }

// TODO 決済プロバイダーの複数対応の設定等の仕様検討
export const settleApiMock = { defaultProvider: 'stripe', ...stripeApiMock } as const
