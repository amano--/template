import { Money } from './etc'

describe('etc', () => {
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
})
