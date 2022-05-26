import * as _ from 'lodash'
import { OutputEvent } from './common'
// import { string } from 'fp-ts'

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
