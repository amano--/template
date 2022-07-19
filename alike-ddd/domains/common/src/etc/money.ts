export type SupportCurrency = 'JPY' | 'USD'
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

// TODO Money のようなDDD文脈における汎用ValueObjectライブラリの調査
// TODO class 的なものを class を使わずに実装するときのベストプラクティスの調査
const minus =
  (thisMoney: Money) =>
  (money: Money): Money => {
    // TODO バリデーション的なやつ、別通貨同士の引き算の実装
    const newAmount = thisMoney.amount - money.amount
    return create(newAmount, thisMoney.currency)
  }

const create = (amount: number, currency: SupportCurrency = 'JPY'): Money => {
  return new SimpleMoney(amount, currency)
  // {
  //   currency,
  //   amount,
  //   minus(),
  // }
}

export const Money = { isMoney, create }

// TODO Money のようなDDD文脈における汎用ValueObjectライブラリの調査
class SimpleMoney {
  // readonly #amount: number
  // readonly #currency: SupportCurrency

  constructor(public readonly amount: number, public readonly currency: SupportCurrency = 'JPY') {}

  minus(money: number | Money): Money {
    const yourMoney = isMoney(money) ? money : create(money)
    // TODO バリデーション的なやつ、別通貨同士の引き算の実装
    const newAmount = this.amount - yourMoney.amount
    return new SimpleMoney(newAmount, this.currency)
  }
}
