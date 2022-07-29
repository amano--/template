import { UserLank } from './lank'

describe('UserLank simple test', () => {
  it('get', () => {
    expect(UserLank.get('Silver')).toMatchObject({ ult: 'Silver' })
  })

  it('overLankKeys', () => {
    expect(UserLank.overLankTags('Silver')).toEqual(['Silver', 'Gold', 'Platinum'])
  })

  it('underLankKeys', () => {
    expect(UserLank.underLankTags('Silver')).toEqual(['None', 'Bronze', 'Silver'])
  })
})
