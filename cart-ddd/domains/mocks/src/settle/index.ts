import { stripeApiMock } from './stripe/api'

import { Money, isMoney, newLogId, ResponseCommandSuccessEvent, ResponseExceptionEvent, UserAccount } from '@me/common'

import { Temporal } from '@js-temporal/polyfill'

import { getLogger } from 'log4js'
const logger = getLogger('mocks/settle/index')

export type SettleProviderId = 'stripe'
export type SettleAccount = { settleAccountId: string }
// export type RawMoney = { currency: 'USD' | 'JPY'; amount: number }

export type SettleEvent = {
  c: 'RawSettle'
  provider: SettleProviderId
  account: SettleAccount
  price: Money
}

export const newSettleEvent = (
  account: SettleAccount,
  price: Money | number,
  provider: SettleProviderId = 'stripe'
): SettleEvent => {
  return {
    c: 'RawSettle',
    provider,
    account,
    price: !isMoney(price) ? { currency: 'JPY', amount: price } : price,
  }
}

export type RawSettleSuccessEvent = ResponseCommandSuccessEvent & {
  r: 'RawSettleSuccess'
  provider: SettleProviderId
  rawLogId: string
}

export type RawSettleFailByCardExpiredEvent = ResponseExceptionEvent & {
  r: 'RawSettleFailByCardExpired'
  provider: SettleProviderId
  rawLogId: string
  expireDate: Temporal.ZonedDateTime
}

export type RawSettleFailByInsufficientFundsEvent = ResponseExceptionEvent & {
  r: 'RawSettleFailByInsufficientFunds'
  rt: 'exception'
  provider: SettleProviderId
  rawLogId: string
  // 差額
  differenceAmount: number
}

export type RawSettleEtcExceptionEvent = ResponseExceptionEvent & {
  r: 'RawSettleEtcException'
  provider: SettleProviderId
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
