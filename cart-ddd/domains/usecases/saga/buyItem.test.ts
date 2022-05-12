import { buyItem } from './buyItem'

describe('buyItem', () => {
  it('test simple', async () => {
    const result = await buyItem({ eventType: 'AdSelect', fromType: 'iphone' })
    console.log(result)
    expect(result).not.toBeNull()
  })
})
