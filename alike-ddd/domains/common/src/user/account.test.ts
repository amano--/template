import { isGuest } from './account'

describe('UserAccount simple test', () => {
  describe('isGuest', () => {
    test.each`
      input                   | expected
      ${undefined}            | ${false}
      ${null}                 | ${false}
      ${{}}                   | ${false}
      ${[]}                   | ${false}
      ${''}                   | ${false}
      ${true}                 | ${false}
      ${0}                    | ${false}
      ${{ guest: undefined }} | ${false}
      ${{ guest: false }}     | ${false}
      ${{ guest: true }}      | ${true}
    `('$input -> $expected ', ({ input, expected }) => {
      expect(isGuest(input)).toBe(expected)
    })
  })
})
