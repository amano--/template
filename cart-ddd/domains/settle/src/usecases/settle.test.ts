import { expectUsecaseLine, Money } from '@alike-ca/common'
import { settle } from './settle'

describe('settle', () => {
  it('成功イベントが返却される', async () => {
    const result = await expectUsecaseLine(
      settle,
      {
        c: 'Settle',
        provider: 'stripe',
        account: { settleAccountId: 'normal' },
        price: Money.create(998),
      },
      {
        r: 'SettleSuccess',
      }
    )
    console.log(result)
  })
})
