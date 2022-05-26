import { addCart, settleCart } from './purchase'
import { MockUserAccounts, MockProducts } from '@me/mocks'

describe('(addCart) ユーザーは商品をカートに追加する', () => {
  it('成功した場合', async () => {
    // TODO 実行結果が補完(型推論)されない問題の解決
    expect(await addCart({ c: 'CartAdd', productId: 'normal' })).toMatchObject({ r: 'CartAddSuccess' })
  })

  it('品切れ状態の場合', async () => {
    expect(await addCart({ c: 'CartAdd', productId: 'outOfStock' })).toMatchObject({ r: 'CartAddProductOutOfStock' })
  })
})

describe('(settleCart) ユーザーはカートを決済する', () => {
  // settleCart の戻り値のイベントを網羅するテストをかく
  const baseInput = { c: 'CartSettle', account: MockUserAccounts.normal, list: [MockProducts.normal] } as const

  // settleCart の戻り値のイベントを網羅するようにテストをかく
  it('成功の場合', async () => {
    expect(await settleCart(baseInput)).toMatchObject({
      r: 'CartSettleSuccess',
    })
  })
  it('ゲストの場合、新規会員登録画面へのNaviイベントが返る', async () => {
    expect(await settleCart({ ...baseInput, account: MockUserAccounts.guestNormal })).toMatchObject({
      r: 'NaviToUserEntry',
    })
  })
  it('残高不足のユーザの場合', async () => {
    expect(await settleCart({ ...baseInput, account: MockUserAccounts.poor })).toMatchObject({
      r: 'CartSettleFailByInsufficientFunds',
    })
  })

  it('カード期限切れユーザの場合', async () => {
    expect(await settleCart({ ...baseInput, account: MockUserAccounts.cardExpired })).toMatchObject({
      r: 'CartSettleFailByCardExpired',
    })
  })
})

describe('検討、検証用テストコード', () => {
  // 以下 検討、検証用コード
  it('settleCart - 戻りのイベントの網羅性のチェック', async () => {
    //TODO 戻りのイベントが追加された場合の網羅性をチェックするためのテストの書き方の検討
    const inputs = [{ c: 'CartSettle', account: MockUserAccounts.normal, list: [MockProducts.normal] }] as const

    const res = await settleCart(inputs[0])

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
    expect(res).not.toBeNull()

    // response type で ある程度型を絞ってから、具体的なイベントを更に絞り込んでいくときのやり方
    switch (res.rt) {
      case 'success':
        break
      case 'alt':
        break
      case 'exception':
        if (res.r === 'CartSettleFailByInsufficientFunds') {
          console.log('res.differenceAmount=', res.differenceAmount)
        }
        if (res.r === 'CartSettleFailByCardExpired') {
          console.log('res.oldDate=', res.oldDate)
        }

        break
      default:
        const check: never = res
    }

    expect(res).not.toBeNull()
  })
})
