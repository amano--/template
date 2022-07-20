// TODO とりあえず sign は半角だとややこしい問題を起こしそうなので　全角文字を設定している
const supportCurrencies = {
  JPY: { code: 'JPY', label: '円', sign: '￥' },
  USD: { code: 'USD', label: '', sign: '＄' },
} as const

export type SupportCurrencyCode = keyof typeof supportCurrencies
export type SupportCurrency = { code: SupportCurrencyCode; label: string; sign: string }

export type Money = SimpleMoney // { currency: SupportCurrency; amount: number }

// TBD 導入検討 [TypeScriptの型定義から型ガードを自動生成する type-predicates-generator の紹介](https://zenn.dev/kimuson/articles/type_predicates_generator)
const isMoney = (arg: unknown): arg is Money => {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    'currency' in arg &&
    'amount' in arg &&
    // TODO コンパイラーの黙らせ方の調査
    typeof (arg as Money).amount === 'number'
  )
}

// // TODO Money のようなDDD文脈における汎用ValueObjectライブラリの調査
// // TODO class 的なものを class を使わずに実装するときのベストプラクティスの調査
// const minus =
//   (thisMoney: Money) =>
//   (money: Money): Money => {
//     // TODO バリデーション的なやつ、別通貨同士の引き算の実装
//     const newAmount = thisMoney.amount - money.amount
//     return create(newAmount, thisMoney.currency)
//   }

const create = (amount: number, currency: SupportCurrencyCode | SupportCurrency = supportCurrencies.JPY): Money => {
  const cur = typeof currency === 'string' ? supportCurrencies[currency] : currency
  return new SimpleMoney(amount, cur)
  // {
  //   currency,
  //   amount,
  //   minus(),
  // }
}

// const toCurrencyLabel = (currency: SupportCurrency = supportCurrencies.JPY): string => {
//   switch (currency) {
//     case 'JPY':
//       return '円'
//     default:
//       return ''
//   }
// }

// const toCurrencySign = (currency: SupportCurrency = 'JPY'): string => {
//   // TODO とりあえず全角文字を返す
//   switch (currency) {
//     case 'JPY':
//       return '￥'
//     case 'USD':
//       return '＄'
//   }
// }

export const Money = { isMoney, create }

// TODO Money のようなDDD文脈における汎用ValueObjectライブラリの調査
//   ref to https://github.com/cbrunnkvist/es-money
class SimpleMoney {
  // public readonly currencyLabel
  // public readonly currencySign

  constructor(public readonly amount: number, public readonly currency: SupportCurrency = supportCurrencies.JPY) {}

  subtract(money: number | Money): Money {
    const yourMoney = Number.isInteger(money) ? create(money) : money
    // TODO バリデーション的なやつ、別通貨同士の引き算の実装
    const newAmount = this.amount - yourMoney.amount
    return new SimpleMoney(newAmount, this.currency)
  }
}