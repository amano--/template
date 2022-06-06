import { addCart, settleCart, listRecommendProducts } from './cart'
import { expectUsecaseLine } from '@alike-ca/common'
import { MockUserAccounts } from '@alike-ca/common/mocks/user'
import { MockProducts } from '../../mocks/products'

describe('(listRecommendProducts) ', () => {
  describe('多言語対応メッセージが取得できることを確認', () => {
    it('SupportLangの言語が指定された場合、対応した文字列が返却される', async () => {
      const res = await listRecommendProducts({ q: 'ListProducts', input: { keyword: 'hoge' } })
      expect(res.message('ja')({ count: 10 })).toEqual('10件 検索されました')
      expect(res.message('en')({ count: res.list.length })).toEqual('2 searched')
    })
    it('SupportLangの言語以外が指定された場合、英語メッセージが返却される', async () => {
      const res = await listRecommendProducts({ q: 'ListProducts', input: { keyword: 'hoge' } })
      expect(res.message('fr')({ count: 10 })).toEqual('10 searched')
    })
  })
})

describe('(addCart) ユーザーは商品をカートに追加する', () => {
  it('成功した場合', async () => {
    await expectUsecaseLine(addCart, { c: 'CartAdd', productId: 'normal' }, { r: 'CartAddSuccess' })
  })

  it('品切れ状態の商品を選んだ場合', async () => {
    await expectUsecaseLine(addCart, { c: 'CartAdd', productId: 'outOfStock' }, { r: 'CartAddProductOutOfStock' })
  })
})

describe('(settleCart) ユーザーはカートを決済する', () => {
  // settleCart の戻り値のイベントを網羅するテストをかく
  const success = { c: 'CartSettle', account: MockUserAccounts.normal, list: [MockProducts.normal] } as const

  // settleCart の戻り値のイベントを網羅するようにテストをかく
  it('成功の場合', async () => {
    await expectUsecaseLine(settleCart, success, { r: 'SettleSuccess' })
  })

  it('ゲストの場合、新規会員登録画面へのNaviイベントが返る', async () => {
    await expectUsecaseLine(
      settleCart,
      { ...success, account: MockUserAccounts.guestNormal },
      { r: 'NaviToUserEntry' }
      // ,{ type: 'shallowEqual' }
    )
  })

  it('残高不足のユーザの場合', async () => {
    await expectUsecaseLine(
      settleCart,
      { ...success, account: MockUserAccounts.poor },
      { r: 'SettleFailByInsufficientFunds' }
    )
  })

  it('カード期限切れユーザの場合', async () => {
    await expectUsecaseLine(
      settleCart,
      { ...success, account: MockUserAccounts.cardExpired },
      { r: 'SettleFailByCardExpired' }
    )
  })
})

describe('検討、検証用テストコード', () => {
  // 以下 検討、検証用コード
  it('settleCart - 戻りのイベントの網羅性のチェック', async () => {
    //TODO 戻りのイベントが追加された場合の網羅性をチェックするためのテストの書き方の検討
    // const inputs = { c: 'CartSettle', account: MockUserAccounts.normal, list: [MockProducts.normal] } as const
    // const x: 'a' | 'b' | 'c' = 'a'

    // const o: { tag: 'a'; a: string } | { tag: 'b'; b: string } | { tag: 'c'; c: 'c' | 'ccb' } = {
    //   tag: 'c',
    //   c: 'ccb',
    // }

    const res = await settleCart({
      c: 'CartSettle',
      account: MockUserAccounts.normal,
      list: [MockProducts.normal, MockProducts.relate1],
    })
    console.log('res=', res)

    switch (res.r) {
      case 'SettleSuccess':
        break
      case 'NaviToUserEntry':
        console.log('res.viewId=', res.viewId)
        break
      case 'SettleFailByCardExpired':
        break
      case 'SettleFailByInsufficientFunds':
        console.log('res.differenceAmount=', res.differenceAmount)
        break
      case 'SettleEtcException':
        break
      // case 'Hoge':
      //   break
      default:
        const check: never = res
    }

    // response type で ある程度型を絞ってから、具体的なイベントを更に絞り込んでいくときのやり方
    switch (res.rt) {
      case 'success':
        // res.r === 'CartSettleSuccess'
        break
      case 'exception':
        if (res.r === 'SettleFailByInsufficientFunds') {
          console.log('res.differenceAmount=', res.differenceAmount)
        }
        if (res.r === 'SettleFailByCardExpired') {
          console.log('res.expireDate=', res.expireDate)
        }
        break
      case 'navi':
        console.log('res.r=', res.r)
        break
      default:
        const check: never = res
    }

    // success 以外はまとめて処理するときのやり方
    switch (res.rt) {
      case 'success':
        // case 'navi':
        console.log('res=', res)
        break
      default:
        console.log('r=', res.r)
      // console.log('logId=', res.logId)
    }

    expect(res).not.toBeNull()
  })
})
