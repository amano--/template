import { overLankKeys, underLankKeys } from './lank'

describe('user lank', () => {
  it('overLankKeys', async () => {
    expect(overLankKeys('Silver')).toEqual(['Silver', 'Gold', 'Platinum'])
  })

  it('underLankKeys', async () => {
    expect(underLankKeys('Silver')).toEqual(['None', 'Bronze', 'Silver'])
  })
})
