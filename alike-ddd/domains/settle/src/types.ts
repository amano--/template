import { assignLogger, Money, ResponseCommandSuccessEvent, ResponseExceptionEvent } from '@alike-ddd/common'

import { Temporal } from '@js-temporal/polyfill'

const logger = assignLogger('settle/types')

export type SettleProviderId = 'stripe'
export const defaultSettleProvider: SettleProviderId = 'stripe'
// export const defaultSettleCurrency: SupportCurrency = 'JPY'

export type SettleAccount = { settleAccountId: string }
// export type RawMoney = { currency: 'USD' | 'JPY'; amount: number }

export type SettleEvent = {
  c: 'Settle'
  provider: SettleProviderId
  account: SettleAccount
  price: Money
}

export const newSettleEvent = (
  account: SettleAccount,
  price: Money | number,
  provider: SettleProviderId = defaultSettleProvider
): SettleEvent => {
  return {
    c: 'Settle',
    provider,
    account,
    price: Money.isMoney(price) ? price : Money.create(price),
  }
}

export type SettleSuccessEvent = ResponseCommandSuccessEvent & {
  r: 'SettleSuccess'
  provider: SettleProviderId
  rawLogId: string
}

export type SettleFailByCardExpiredEvent = ResponseExceptionEvent & {
  r: 'SettleFailByCardExpired'
  provider: SettleProviderId
  rawLogId: string
  expireDate: Temporal.ZonedDateTime
}

export type SettleFailByInsufficientFundsEvent = ResponseExceptionEvent & {
  r: 'SettleFailByInsufficientFunds'
  rt: 'exception'
  provider: SettleProviderId
  rawLogId: string
  // 差額
  differenceAmount: number
}

export type SettleEtcExceptionEvent = ResponseExceptionEvent & {
  r: 'SettleEtcException'
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

// export const settleApiMock = stripeApiMock //{ ... } as const
