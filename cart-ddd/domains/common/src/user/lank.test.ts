import { UserLank } from './lank'

describe('UserLank simple test', () => {
  it('get', async () => {
    expect(UserLank.get('Silver')).toMatchObject({ utag: 'Silver' })
  })

  it('overLankKeys', async () => {
    expect(UserLank.overLankKeys('Silver')).toEqual(['Silver', 'Gold', 'Platinum'])
  })

  it('underLankKeys', async () => {
    expect(UserLank.underLankKeys('Silver')).toEqual(['None', 'Bronze', 'Silver'])
  })
})
