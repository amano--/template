import { UserLank } from './lank'

describe('UserLank simple test', () => {
  it('get', async () => {
    expect(UserLank.get('Silver')).toMatchObject({ ult: 'Silver' })
  })

  it('overLankKeys', async () => {
    expect(UserLank.overLankTags('Silver')).toEqual(['Silver', 'Gold', 'Platinum'])
  })

  it('underLankKeys', async () => {
    expect(UserLank.underLankTags('Silver')).toEqual(['None', 'Bronze', 'Silver'])
  })
})
