type UserLankBase = { label: string; desc: string }

type NoneLank = { utag: 'None' } & UserLankBase
type BronzeLank = { utag: 'Bronze' } & UserLankBase
type SilverLank = { utag: 'Silver' } & UserLankBase
type GoldLank = { utag: 'Gold' } & UserLankBase
type PlatinumLank = { utag: 'Platinum' } & UserLankBase

export type UserLank = NoneLank | BronzeLank | SilverLank | GoldLank | PlatinumLank

export const UserLanks = {
  None: {
    utag: 'None',
    label: 'ランクなし',
    desc: 'ランクなし',
  },
  Bronze: {
    utag: 'Bronze',
    label: 'ブロンズ',
    desc: 'ブロンズ',
  },
  Silver: {
    utag: 'Silver',
    label: 'シルバー',
    desc: 'シルバー',
  },
  Gold: {
    utag: 'Gold',
    label: 'ゴールド',
    desc: 'ゴールド',
  },
  Platinum: {
    utag: 'Platinum',
    label: 'プラチナ',
    desc: 'プラチナ',
  },
} as const

const typeCheckLank: { [P: string]: UserLank } = UserLanks

export type UserLankKey = keyof typeof UserLanks

// type Hoge<A extends Record<string, unknown>> = A extends Record<infer K, infer V> ? { K: V } : never
// type A = Hoge<typeof UserLanks>
// export const split = <V, O extends { [P: keyof O]: V }>(obj: O) => Object.entries(obj)
// const a = split(UserLanks)

const splitByKey = (key: string, obj: any, direction: 'under' | 'over' = 'over') => {
  const arr = Object.entries(obj)
  const start = arr.findIndex(([k]) => k === key)
  const res = direction === 'over' ? arr.slice(start, arr.length) : arr.slice(0, start + 1)
  return Object.fromEntries(res)
}

export const overLankKeys = (key: UserLankKey) => Object.keys(splitByKey(key, UserLanks, 'over')) as [UserLankKey]
export const underLankKeys = (key: UserLankKey) => Object.keys(splitByKey(key, UserLanks, 'under')) as [UserLankKey]
