/**
 *  @param upt tagged union の Keyに使用するタグ. user Plan tag の略。
 */
type UserPlanBase = { upt: UserPlanTag; label: string; desc: string }

type NonePlan = UserPlanBase & { upt: 'None' }
type SmallPlan = UserPlanBase & { upt: 'Small' }
type MediumPlan = UserPlanBase & { upt: 'Medium' }
type LargePlan = UserPlanBase & { upt: 'Large' }

export type UserPlan = NonePlan | SmallPlan | MediumPlan | LargePlan

const list = {
  None: {
    upt: 'None',
    label: 'ランクなし',
    desc: 'ランクなし',
  },
  Small: {
    upt: 'Small',
    label: 'ブロンズ',
    desc: 'ブロンズ',
  },
  Medium: {
    upt: 'Medium',
    label: 'シルバー',
    desc: 'シルバー',
  },
  Large: {
    upt: 'Large',
    label: 'ゴールド',
    desc: 'ゴールド',
  },
} as const

const typeCheckPlan: { [P: string]: UserPlan } = list

export type UserPlanTag = keyof typeof list

// type Hoge<A extends Record<string, unknown>> = A extends Record<infer K, infer V> ? { K: V } : never
// type A = Hoge<typeof UserPlans>
// export const split = <V, O extends { [P: keyof O]: V }>(obj: O) => Object.entries(obj)
// const a = split(UserPlans)

const sliceByKey = <T extends Record<keyof T, unknown>>(key: keyof T, obj: T, direction: 'under' | 'over' = 'over') => {
  const arr = Object.entries(obj)
  const start = arr.findIndex(([k]) => k === key)
  const res = direction === 'over' ? arr.slice(start, arr.length) : arr.slice(0, start + 1)
  return Object.fromEntries(res)
}

const get = <K extends UserPlanTag>(key: K) => list[key]
const overPlanTags = <K extends UserPlanTag>(key: K) => Object.keys(sliceByKey(key, list, 'over')) as [UserPlanTag]
const underPlanTags = <K extends UserPlanTag>(key: K) => Object.keys(sliceByKey(key, list, 'under')) as [UserPlanTag]

export const UserPlan = { list, get, overPlanTags, underPlanTags } as const
