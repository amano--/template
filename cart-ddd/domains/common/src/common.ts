import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'
import * as _ from 'lodash'
// import { string } from 'fp-ts'

export type Ulid = string

export type PickCommandEvent<A> = A extends { c: string } ? A : never
export type PickQueryEvent<A> = A extends { q: string } ? A : never

export const newLogId = (seedTime?: number) => ulid(seedTime ?? Temporal.Now.instant().epochMilliseconds)

export type UnsaveEvent = { unsave?: boolean }

export type CommandEvent = { c: string } & UnsaveEvent
export type QueryEvent = { q: string } & UnsaveEvent
// export type FetchEvent = { f: string } & UnsaveEvent
export type UserEvent = { u: string } & UnsaveEvent

export type CommandLog = { logId?: Ulid }

/**
 * サーバーのレスポンスに使用する 出力用イベント
 *
 * @param  r TaggedUnionのタグとして使用するため、ユニークなイベント名を設定する。
 * @param category success 正常フロー alt 代替フロー exception 例外フロー 省略時は success として扱われる
 */
export type ResponseEvent = {
  r: string
  category?: 'success' | 'alt' | 'exception'
  logId?: Ulid
}
// export type ExceptionEvent = { x: string }
// export type EtcEvent = { e: string } & UnsaveEvent

export type InputEvent = CommandEvent | QueryEvent | UserEvent //| FetchEvent
export type OutputEvent = ResponseEvent

export type AllEvent = InputEvent | OutputEvent
// type AllEvent = {
//   [P in keyof (CommandEvent & QueryEvent & UserEvent & FetchEvent & EtcEvent)]?: string
// }

export type QuerySuccessEvent<DATA> = { r: 'QuerySuccess'; list: DATA[] }
export type PagedQuerySuccessEvent<DATA> = {
  r: 'PagedQuerySuccess'
  list: DATA[]

  //TODO ページングに関する情報を精査し正しく設定
  max: number
  count: number
  pageCount: number
  pageStep: number
}

export type UserId = string

export type UserAccount = { userId: UserId; name: string }
export type EncryptedUserAccount = UserAccount & { encryptedPassword: string }
export type GuestAccount = { guest: true; fromUrl: string }

export const isGuest = (account: UserAccount | GuestAccount): account is GuestAccount => {
  return 'guest' in account
}

export type CreateUserAccountEvent = { c: 'CreateUserAccount'; input: { name: string } }

export type CreateUserAccountSuccessEvent = { r: 'CreateUserAccountSuccess' } & UserAccount & CommandLog

export type CreateUserAccountDuplicatedExceptionEvent = { r: 'CreateUserAccountDuplicatedException' }

// export type AllEventRes = any // { logId?: Ulid }

export type UsecaseLine<IN, OUT> = (e: IN) => Promise<OUT>

export type UsecaseLineAny = (e: any) => Promise<OutputEvent>
// type Usecases<E extends AllEvent> = { [P: string]: (e: E) => Promise<AllEventRes> }
// TODO 本当は type Usecases = { [P: string]: (e: AllEvent) => Promise<AllEventRes> }
// のような定義をして型チェックと厳密化したいが方法がわからないので any でごまかす
export type Usecases<T> = { [P in keyof T]: UsecaseLineAny }

export type Usecase<T> = Usecases<T> | UsecaseLineAny

// export type PickUsecasesInOut<A> = {
//   [P in keyof A]: A[P] extends (e: infer EVENT) => Promise<infer RESULT> ? [EVENT, RESULT] : never
// }
// export type TestParamsOption = { onlyEventCheck?: boolean }

export type PickUsecasesTestParams<A extends Usecases<A>> = {
  [P in keyof A]: A[P] extends (e: infer EVENT) => Promise<infer EVENT_RES>
    ? { in: Partial<EVENT>; out: Partial<EVENT_RES> }
    : never
}

export type PickUsecasesExecResults<A extends Usecases<A>> = {
  [P in keyof A]: A[P] extends (e: infer EVENT) => Promise<infer EVENT_RES>
    ? { usecase: string; input: EVENT; expected: EVENT_RES; actual: EVENT_RES }
    : never
}

export const execUsecases = async <A extends Usecases<A>, B extends PickUsecasesTestParams<A>>(
  usecases: A,
  testParams: B
): Promise<PickUsecasesExecResults<A>> => {
  const results = _.map(usecases, async (f, name): Promise<[string, any]> => {
    const param = _.get(testParams, name)

    // console.log(name, param)

    //Object.setPrototypeOf({},name)
    return [name, { input: param.in, expected: param.out, actual: await f(param.in) }]
  })

  const res = Object.fromEntries(await Promise.all(results))
  return res as PickUsecasesExecResults<A>
}

export type PickInEventFromUsecaseLine<A extends UsecaseLineAny> = A extends (e: infer IN) => Promise<any> ? IN : never

export type PickOutEventFromUsecaseLine<A extends UsecaseLineAny> = A extends (e: any) => Promise<infer OUT>
  ? OUT
  : never

// TODO 型計算のテストをどこに書くのが良いかの検討
// const line = (e: { c: 'Command' }) =>
//   e.c === 'Command' ? Promise.resolve({ r: 'Success' } as const) : Promise.resolve({ r: 'Fail' } as const)

// type A = typeof line

//TODO 本来なら devDependencies に分離するべきテスト用メソッドだが、面倒なのでここにとりあえず置く
export const expectUsecaseLine = async <A extends UsecaseLineAny>(
  line: A,
  expectedIn: PickInEventFromUsecaseLine<A>,
  expectedOut: Partial<PickOutEventFromUsecaseLine<A>>
) => {
  const results = await line(expectedIn)
  expect(results).toMatchObject(expectedOut)
  return results as Partial<PickOutEventFromUsecaseLine<A>>
}

export const expectUsecases = async <A extends Usecases<A>, B extends PickUsecasesTestParams<A>>(
  usecases: A,
  testParams: B
) => {
  const results = await execUsecases(usecases, testParams)

  Object.values(results).forEach((res: any) => {
    console.log(JSON.stringify(res, null, 2))
    expect(res.actual).toMatchObject(res.expected)
  })

  return results
}
