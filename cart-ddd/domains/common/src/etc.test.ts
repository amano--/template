import { isMoney, Money } from './etc'

describe('etc', () => {
  test.each`
    input                                  | expected
    ${undefined}                           | ${false}
    ${null}                                | ${false}
    ${100}                                 | ${false}
    ${{ currency: 'JPY' }}                 | ${false}
    ${{ currency: 'JPY', amount: '1000' }} | ${false}
    ${{ currency: 'JPY', amount: 1000 }}   | ${true}
  `('isMoney: $input -> $expected ', ({ input, expected }) => {
    expect(isMoney(input)).toBe(expected)
  })
})
