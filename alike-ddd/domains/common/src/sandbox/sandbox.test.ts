/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
describe('template literal', () => {
  it('aa', () => {
    const template = (lang: 'ja', args: { max: number; min: number }) =>
      `${args.min} 以上 ${args.max} を入力してください` //as const

    console.log(template('ja', { min: 1, max: 10 }))
  })
})

type A = { a: string }
type B = { b: string }

type AandB = ((a: A) => string) | ((b: B) => string)

const ab: AandB = () => 'hoge'
const ab1: ((a: A) => string) | ((b: B) => string) = () => 'hoge'
test('func invariant check', () => {
  console.log(ab1({ a: 'a', b: 'b' }))
})

const mockApi = {
  api1: (a: string) => 'api1 mock',
  api2: (a: string) => 'api2 mock',
  // api3: (c: string) => 'api3 mock',
} as const

const productionApi = {
  api1: (a: string) => 'api1 productionApi',
  api2: (a: string, b: string) => 'api2 productionApi',
  api3: (c: string) => 'api3 productionApi',
} as const

// eslint-disable-next-line no-undef
const isProduction = process.env.NODE_ENV === 'production'
const api = isProduction ? productionApi : mockApi

const a = api.api1
