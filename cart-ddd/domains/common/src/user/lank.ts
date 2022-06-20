/**
 *  @param ult tagged union の Keyに使用するタグ. user lank tag の略。
 */
type UserLankBase = { ult: string; label: string; desc: string }

type NoneLank = UserLankBase & { ult: 'None' }
type BronzeLank = UserLankBase & { ult: 'Bronze' }
type SilverLank = UserLankBase & { ult: 'Silver' }
type GoldLank = UserLankBase & { ult: 'Gold' }
type PlatinumLank = UserLankBase & { ult: 'Platinum' }

export type UserLank = NoneLank | BronzeLank | SilverLank | GoldLank | PlatinumLank

const list = {
  None: {
    ult: 'None',
    label: 'ランクなし',
    desc: 'ランクなし',
  },
  Bronze: {
    ult: 'Bronze',
    label: 'ブロンズ',
    desc: 'ブロンズ',
  },
  Silver: {
    ult: 'Silver',
    label: 'シルバー',
    desc: 'シルバー',
  },
  Gold: {
    ult: 'Gold',
    label: 'ゴールド',
    desc: 'ゴールド',
  },
  Platinum: {
    ult: 'Platinum',
    label: 'プラチナ',
    desc: 'プラチナ',
  },
} as const

const typeCheckLank: { [P: string]: UserLank } = list

export type UserLankTag = keyof typeof list

// type Hoge<A extends Record<string, unknown>> = A extends Record<infer K, infer V> ? { K: V } : never
// type A = Hoge<typeof UserLanks>
// export const split = <V, O extends { [P: keyof O]: V }>(obj: O) => Object.entries(obj)
// const a = split(UserLanks)

const sliceByKey = <T extends Record<keyof T, unknown>>(key: keyof T, obj: T, direction: 'under' | 'over' = 'over') => {
  const arr = Object.entries(obj)
  const start = arr.findIndex(([k]) => k === key)
  const res = direction === 'over' ? arr.slice(start, arr.length) : arr.slice(0, start + 1)
  return Object.fromEntries(res)
}

const get = <K extends UserLankTag>(key: K) => list[key]
const overLankTags = <K extends UserLankTag>(key: K) => Object.keys(sliceByKey(key, list, 'over')) as [UserLankTag]
const underLankTags = <K extends UserLankTag>(key: K) => Object.keys(sliceByKey(key, list, 'under')) as [UserLankTag]

export const UserLank = { list, get, overLankTags, underLankTags } as const
