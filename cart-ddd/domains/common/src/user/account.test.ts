import { isGuest } from './account'

describe('UserAccount simple test', () => {
  test.each`
    input                   | expected
    ${undefined}            | ${false}
    ${null}                 | ${false}
    ${{}}                   | ${false}
    ${[]}                   | ${false}
    ${0}                    | ${false}
    ${{ guest: undefined }} | ${false}
    ${{ guest: false }}     | ${false}
    ${{ guest: true }}      | ${true}
  `('isGuest: $input -> $expected ', ({ input, expected }) => {
    expect(isGuest(input)).toBe(expected)
  })
})
