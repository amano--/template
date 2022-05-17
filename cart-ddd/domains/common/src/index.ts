import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'
import * as _ from 'lodash'

export * from './api'

export type Ulid = string

export type PickCommandEvent<A> = A extends { c: string } ? A : never
export type PickQueryEvent<A> = A extends { q: string } ? A : never

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

export type UnsaveEvent = { unsave?: boolean }

export type CommandEvent = { c: string } & UnsaveEvent
export type QueryEvent = { q: string } & UnsaveEvent
export type FetchEvent = { f: string } & UnsaveEvent
export type UserEvent = { u: string }
export type EtcEvent = { e: string } & UnsaveEvent

export type AllEvent = CommandEvent | QueryEvent | UserEvent | FetchEvent | EtcEvent
// type AllEvent = {
//   [P in keyof (CommandEvent & QueryEvent & UserEvent & FetchEvent & EtcEvent)]?: string
// }

export type AllEventRes = any // { logId?: Ulid }

// type Usecases<E extends AllEvent> = { [P: string]: (e: E) => Promise<AllEventRes> }
// TODO 本当は type Usecases = { [P: string]: (e: AllEvent) => Promise<AllEventRes> }
// のような定義をして型チェックと厳密化したいが方法がわからないので any でごまかす
export type Usecases = { [P: string]: (e: any) => Promise<AllEventRes> }

export const execUsecases = async <E extends AllEvent>(
  saga: Usecases,
  testParams: PickUsecasesTestParams<Usecases>
) => {
  const results = _.map(saga, async (f, name) => {
    const param = _.get(testParams, name)

    // console.log(name, param)

    return { usecase: name, input: param[0], expected: param[1], actual: await f(param[0] as E) }
  })

  return await Promise.all(results)
}

// const buyProduct = {
//   selectAd: (e: string) => Promise.resolve('hoge'),
//   listRecommendProducts: (e: number) => Promise.resolve(111),
// }
// type a = PickUsecasesInOut<typeof buyProduct>
