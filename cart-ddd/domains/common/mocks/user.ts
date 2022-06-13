import { GuestAccount, lanks, UserAccount } from '@alike-ca/common'

const users = {
  normal: { userId: 'normal', name: 'normal', lank: lanks.Bronze },
  poor: { userId: 'poor', name: 'poor', lank: lanks.Bronze },
  cardExpired: { userId: 'cardExpired', name: 'cardExpired', lank: lanks.Bronze },

  lankBronze: { userId: 'lankBronze', name: 'lankBronze', lank: lanks.Bronze },
  lankSilver: { userId: 'lankSilver', name: 'lankSilver', lank: lanks.Silver },
  lankGold: { userId: 'lankGold', name: 'lankGold', lank: lanks.Gold },
  lankPlatinum: { userId: 'lankPlatinum', name: 'lankPlatinum', lank: lanks.Platinum },

  // TODO 以下のようにしてデータ入力時方の補完を聞かせたいのだがやり方がわからない
  // cardExpired: { userId: 'cardExpired', name: 'cardExpired' } as UserAccount,
} as const

const guests = { guestNormal: { guest: true, fromUrl: 'guestNormal', lank: lanks.None } as GuestAccount } as const

export const MockUserAccounts = { ...users, ...guests } as const

// [ TypeScript で string 型の値に自動補完を効かせる ](https://nanto.asablo.jp/blog/2021/09/11/9422241)
export type MockUserAccountIdType = keyof typeof MockUserAccounts | (string & {})

const typeCheckAccount: { [P: string]: UserAccount } = users
