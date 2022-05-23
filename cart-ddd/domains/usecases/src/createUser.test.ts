import { expectUsecaseLine } from '@me/common'
import { createAccount } from './createUser'

describe('createAccount', () => {
  describe('正常フロー', () => {
    it('成功イベントが返却される', async () => {
      const result = await expectUsecaseLine(
        createAccount,
        {
          c: 'CreateUserAccount',
          input: { name: 'createUserAccount' },
        },
        {
          r: 'CreateUserAccountSuccess',
        }
      )
      console.log(result)
    })
  })

  describe('代替フロー', () => {
    it('すでにアカウント名が使用されていた場合、', async () => {
      const result = await expectUsecaseLine(
        createAccount,
        {
          c: 'CreateUserAccount',
          input: { name: 'duplicated' },
        },
        {
          r: 'CreateUserAccountDuplicatedException',
        }
      )
      console.log(result)
    })
  })
})
