import { listRecommendProducts } from './listProduct'

describe('(listRecommendProducts) ', () => {
  describe('多言語対応メッセージが取得できることを確認', () => {
    it('SupportLangの言語が指定された場合、対応した文字列が返却される', async () => {
      const res = await listRecommendProducts({
        q: 'ListRecommendProducts',
        input: {},
      })
      expect(res.message('ja')({ count: 10 })).toEqual('10件 検索されました')
      expect(res.message('en')({ count: res.list.length })).toEqual('2 searched')
    })
    it('SupportLangの言語以外が指定された場合、英語メッセージが返却される', async () => {
      const res = await listRecommendProducts({ q: 'ListRecommendProducts', input: {} })
      expect(res.message('fr')({ count: 10 })).toEqual('10 searched')
    })
  })
})
