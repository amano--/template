describe('template literal', () => {
  it('aa', () => {
    const template = (lang: 'ja', args: { max: number; min: number }) =>
      `${args.min} 以上 ${args.max} を入力してください` //as const

    console.log(template('ja', { min: 1, max: 10 }))
  })
})

type A = { a: string }
type B = { b: string }

type A_B = ((a: A) => string) | ((b: B) => string)

const ab: A_B = () => 'hoge'
const ab1: ((a: A) => string) | ((b: B) => string) = () => 'hoge'
test('func invariant check', () => {
  console.log(ab1({ a: 'a', b: 'b' }))
})
