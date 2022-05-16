export * from './api'

export type Ulid = string

export type PickCommandEvent<A> = A extends { c: string } ? A : never
export type PickQueryEvent<A> = A extends { q: string } ? A : never

import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'

export const newLogId = (seedTime?: number) => ulid(seedTime ?? Temporal.Now.instant().epochMilliseconds)

export type PickUsecasesInOut<A> = {
  [P in keyof A]: A[P] extends (e: infer EVENT) => Promise<infer RESULT> ? [EVENT, RESULT] : never
}

// export type TestParamsOption = { onlyEventCheck?: boolean }

export type PickUsecasesTestParams<A> = {
  [P in keyof A]: A[P] extends (e: infer EVENT) => Promise<infer EVENT_RES>
    ? [Partial<EVENT>, Partial<EVENT_RES>]
    : never
}

// const buyProduct = {
//   selectAd: (e: string) => Promise.resolve('hoge'),
//   listRecommendProducts: (e: number) => Promise.resolve(111),
// }
// type a = PickUsecasesInOut<typeof buyProduct>
