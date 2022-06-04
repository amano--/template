import { isMoney, Money } from './etc'

describe('etc', () => {
  it('isMoney', async () => {
    expect(isMoney(undefined)).toBeFalsy()
    expect(isMoney(null)).toBeFalsy()
    expect(isMoney(100)).toBeFalsy()
    expect(isMoney({ currency: 'JPY' } as Money)).toBeFalsy()
    expect(isMoney({ currency: 'JPY' } as Money)).toBeFalsy()
    expect(isMoney({ currency: 'JPY', amount: '1000' })).toBeFalsy()
    expect(isMoney({ currency: 'JPY', amount: 1000 } as Money)).toBeTruthy()
  })
})
