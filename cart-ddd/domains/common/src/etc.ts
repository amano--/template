export type SupportCurrency = 'JPY' | 'USD'
export type Money = { currency: SupportCurrency; amount: number }

// TBD 導入検討 [TypeScriptの型定義から型ガードを自動生成する type-predicates-generator の紹介](https://zenn.dev/kimuson/articles/type_predicates_generator)
export const isMoney = (arg: unknown): arg is Money => {
  return (
    typeof arg === 'object' &&
    arg !== null &&
    'currency' in arg &&
    'amount' in arg &&
    // TODO コンパイラーの黙らせ方の調査
    typeof (arg as Money).amount === 'number'
  )
}

const create = (amount: number, currency: SupportCurrency = 'JPY'): Money => {
  return {
    currency,
    amount,
  }
}

export const Money = { create }
