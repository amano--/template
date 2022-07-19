import { Money } from '.'

describe('Money', () => {
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
  `('minus: Money($input1) - Money($input2) = Money($expected) ', ({ input1, input2, expected }) => {
    expect(Money.create(input1).minus(Money.create(input2))).toEqual(Money.create(expected))
  })
})
