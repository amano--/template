import { ShippingMethod } from './ShippingMethod'

describe('ShippingMethod simple test', () => {
  describe('get', () => {
    it('個別のメソッドが呼べることを確認', async () => {
      expect(ShippingMethod.get('doraemon', 'suneo').summonMama()).toEqual('スネちゃま、おこずかいあげる')
    })
  })

  it('overLankKeys', async () => {
    expect(UserLank.overLankKeys('Silver')).toEqual(['Silver', 'Gold', 'Platinum'])
  })

  it('underLankKeys', async () => {
    expect(UserLank.underLankKeys('Silver')).toEqual(['None', 'Bronze', 'Silver'])
  })
})
