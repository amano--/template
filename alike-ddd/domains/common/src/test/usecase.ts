import { OutputEvent } from '../event'
// import { string } from 'fp-ts'

export type UsecaseLine<IN, OUT> = (e: IN) => Promise<OUT>

export type UsecaseLineAny<InputEvent = any> = (e: InputEvent) => Promise<OutputEvent>
// type Usecases<E extends AllEvent> = { [P: string]: (e: E) => Promise<AllEventRes> }
// TODO 本当は type Usecases = { [P: string]: (e: AllEvent) => Promise<AllEventRes> }
// のような定義をして型チェックと厳密化したいが方法がわからないので unknown でごまかす
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

// export const execUsecases = async <A extends Usecases<A>, B extends PickUsecasesTestParams<A>>(
//   usecases: A,
//   testParams: B
// ): Promise<PickUsecasesExecResults<A>> => {
//   // TODO as any でごまかしていることへの対処
//   const results = Object.entries(usecases).map(async ([key, usecaseLine]: [string, UsecaseLineAny]) => {
//     const param = (testParams as any)[key]
//     return [key, { input: param.in, expected: param.out, actual: await usecaseLine(param.in) }]
//   })
//   const res = Object.fromEntries(await Promise.all(results as any))
//   // console.log({ res })
//   return res as PickUsecasesExecResults<A>
// }

export const execUsecases = async <A extends Usecases<A>, B extends PickUsecasesTestParams<A>>(
  usecases: A,
  testParams: B
): Promise<PickUsecasesExecResults<A>> => {
  // TODO as any でごまかしていることへの対処
  const results = Object.entries(usecases).map(async ([key, usecaseLine]: [string, UsecaseLineAny]) => {
    const param = (testParams as any)[key]
    return [key, { input: param.in, expected: param.out, actual: await usecaseLine(param.in) }]
  })
  const res = Object.fromEntries(await Promise.all(results as any))
  // console.log({ res })
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
type ExpectOptions = { type: 'partialMatch' } | { type: 'shallowEqual' }

export const expectUsecaseLine = async <A extends UsecaseLineAny>(
  usecaseLine: A,
  input: PickInEventFromUsecaseLine<A>,
  expectedOut: Partial<PickOutEventFromUsecaseLine<A>>,
  expectOption: ExpectOptions = { type: 'partialMatch' }
) => {
  const results = await usecaseLine(input)

  switch (expectOption.type) {
    case 'shallowEqual':
      expect(results).toEqual(expectedOut)
      break

    default:
      expect(results).toMatchObject(expectedOut)
  }
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
