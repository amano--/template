import { GuestAccount, UserAccount } from '@me/common'

const users = {
  normal: { userId: 'normal', name: 'normal' },
  poor: { userId: 'poor', name: 'poor' },
  cardExpired: { userId: 'cardExpired', name: 'cardExpired' },
  // TODO 以下のようにしてデータ入力時方の補完を聞かせたいのだがやり方がわからない
  // cardExpired: { userId: 'cardExpired', name: 'cardExpired' } as UserAccount,
} as const

const guests = { guestNormal: { guest: true, fromUrl: 'guestNormal' } as GuestAccount } as const

// [ TypeScript で string 型の値に自動補完を効かせる ](https://nanto.asablo.jp/blog/2021/09/11/9422241)
export const MockUserAccounts = { ...users, ...guests } as const
export type MockUserAccountIdType = keyof typeof MockUserAccounts | (string & {})
