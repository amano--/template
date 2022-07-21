import { Money } from '.'

describe('Money', () => {
  it('create', () => {
    const expected = { amount: 100, currency: { code: 'JPY', label: '円', sign: '￥', locale: 'ja-JP' } }

    expect(Money.create(100)).toEqual(expected)
    expect(Money.create(100, 'JPY')).toEqual(expected)
  })

  it('label', () => {
    expect(Money.create(1000).label()).toEqual('1,000円')
    expect(Money.create(1000, 'USD').label()).toEqual('1,000')
  })
  test.each`
    input                                  | expected
    ${undefined}                           | ${false}
    ${null}                                | ${false}
    ${{}}                                  | ${false}
    ${[]}                                  | ${false}
    ${''}                                  | ${false}
    ${true}                                | ${false}
    ${0}                                   | ${false}
    ${100}                                 | ${false}
    ${{ currency: 'JPY' }}                 | ${false}
    ${{ currency: 'JPY', amount: '1000' }} | ${false}
    ${{ currency: 'JPY', amount: 1000 }}   | ${true}
  `('isMoney: $input -> $expected ', ({ input, expected }) => {
    expect(Money.isMoney(input)).toBe(expected)
  })

  test.each`
    input1  | input2 | expected
    ${1000} | ${500} | ${500}
  `(
    'subtract: Money($input1) - Money($input2) = Money($expected) ',
    ({ input1, input2, expected }: { input1: number; input2: number; expected: number }) => {
      const target = Money.create(input1)
      const expectedMoney = Money.create(expected)

      expect(target.subtract(input2)).toEqual(expectedMoney)
      expect(target.subtract(Money.create(input2))).toEqual(expectedMoney)
      expect(target.subtract(Money.create(input2, 'JPY'))).toEqual(expectedMoney)
    }
  )
  // 別の書き方をためしてみた
  test.each([
    [1200, 501, 699],
    [2500, 600, 1900],
  ])('subtract2: Money(%d) - Money(%d) = Money(%d) ', (input1, input2, expected) => {
    const target = Money.create(input1)
    const expectedMoney = Money.create(expected)

    expect(target.subtract(input2)).toEqual(expectedMoney)
    expect(target.subtract(Money.create(input2))).toEqual(expectedMoney)
    expect(target.subtract(Money.create(input2, 'JPY'))).toEqual(expectedMoney)
  })
})
