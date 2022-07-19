import { SaleProductPops } from './pop'

describe('Pop - 設計のための雑テスト集', () => {
  it('test', () => {
    expect(SaleProductPops.newPops('', '')).toEqual({ list: [] })
  })
})
