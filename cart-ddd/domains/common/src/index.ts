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
    ? { in: Partial<EVENT>; out: Partial<EVENT_RES> }
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

export const execUsecases = async <T extends PickUsecasesTestParams<Usecases>>(usecases: Usecases, testParams: T) => {
  const results = _.map(usecases, async (f, name) => {
    const param = _.get(testParams, name)

    // console.log(name, param)

    return { usecase: name, input: param.in, expected: param.out, actual: await f(param.in) }
  })

  return await Promise.all(results)
}

//TODO 本来なら devDependencies に分離するべきテスト用メソッドだが、面倒なのでここにとりあえず置く
export const expectUsecases = async <T extends PickUsecasesTestParams<Usecases>>(usecases: Usecases, testParams: T) => {
  const results = await execUsecases(usecases, testParams)

  results.forEach((res) => {
    console.log(JSON.stringify(res, null, 2))
    expect(res.actual).toMatchObject(res.expected)
  })
}
