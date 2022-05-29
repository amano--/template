import { addCart, settleCart, listRecommendProducts } from './purchase'
import { MockUserAccounts, MockProducts } from '@me/mocks'
import { expectUsecaseLine } from '@me/common'

describe('(listRecommendProducts) ', () => {
  describe('多言語対応メッセージが取得できることを確認', () => {
    it('SupportLangの言語が指定された場合、対応した文字列が返却される', async () => {
      const res = await listRecommendProducts({ q: 'ListProducts', input: { keyword: 'hoge' } })
      expect(res.msg('ja')).toEqual('検索が成功しました')
      expect(res.msg('en')).toEqual('query success')
    })
    it('SupportLangの言語以外が指定された場合、英語メッセージが返却される', async () => {
      const res = await listRecommendProducts({ q: 'ListProducts', input: { keyword: 'hoge' } })
      expect(res.msg('fr')).toEqual('query success')
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
    await expectUsecaseLine(settleCart, success, { r: 'CartSettleSuccess' })
  })

  it('ゲストの場合、新規会員登録画面へのNaviイベントが返る', async () => {
    await expectUsecaseLine(
      settleCart,
      { ...success, account: MockUserAccounts.guestNormal },
      { r: 'NaviToUserEntry' }
      // { type: 'shallowEqual' }
    )
  })

  it('残高不足のユーザの場合', async () => {
    await expectUsecaseLine(
      settleCart,
      { ...success, account: MockUserAccounts.poor },
      { r: 'CartSettleFailByInsufficientFunds' }
    )
  })

  it('カード期限切れユーザの場合', async () => {
    await expectUsecaseLine(
      settleCart,
      { ...success, account: MockUserAccounts.cardExpired },
      { r: 'CartSettleFailByCardExpired' }
    )
  })
})

describe('検討、検証用テストコード', () => {
  // 以下 検討、検証用コード
  it('settleCart - 戻りのイベントの網羅性のチェック', async () => {
    //TODO 戻りのイベントが追加された場合の網羅性をチェックするためのテストの書き方の検討
    // const inputs = [{ c: 'CartSettle', account: MockUserAccounts.normal, list: [MockProducts.normal] }] as const

    const res = await settleCart({ c: 'CartSettle', account: MockUserAccounts.normal, list: [MockProducts.normal] })

    switch (res.r) {
      case 'CartSettleSuccess':
        break
      case 'NaviToUserEntry':
        break
      case 'CartSettleFailByCardExpired':
        break
      case 'CartSettleFailByInsufficientFunds':
        break
      case 'CartSettleEtcFail':
        break
      default:
        const check: never = res
    }

    // response type で ある程度型を絞ってから、具体的なイベントを更に絞り込んでいくときのやり方
    switch (res.rt) {
      case 'success':
        // res.r === 'CartSettleSuccess'
        break
      case 'alt':
        break
      case 'exception':
        if (res.r === 'CartSettleFailByInsufficientFunds') {
          console.log('res.differenceAmount=', res.differenceAmount)
        }
        if (res.r === 'CartSettleFailByCardExpired') {
          console.log('res.oldDate=', res.expireDate)
        }

        break
      default:
        const check: never = res
    }

    // success 以外はまとめて処理するときのやり方
    switch (res.rt) {
      case 'success':
        break
      default:
        console.log('logId=', res.logId)
    }

    expect(res).not.toBeNull()
  })
})
