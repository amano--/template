describe('template literal', () => {
  it('aa', () => {
    const template = (lang: 'ja', args: { max: number; min: number }) =>
      `${args.min} 以上 ${args.max} を入力してください` //as const

    console.log(template('ja', { min: 1, max: 10 }))
  })
})
