// 参考 [TypeScript 型レベルプログラミングの細かいテクニック](https://zenn.dev/suin/scraps/8828d6c915298c)

declare function expectType<A>(): {
  toBe<B>(): IsSame<A, B> extends true
    ? OK
    : 'Expected that A and B should be assignable to each other' & {
        A: A
        B: B
      }
  toBeAssignableTo<B>(): IsAssignable<A, B> extends true
    ? OK
    : 'Expected that A should be assignable to B' & { A: A; B: B }
  notToBeAssignableTo<B>(): IsAssignable<A, B> extends false
    ? OK
    : 'Expected that A should not be assignable to B' & { A: A; B: B }
}
type IsSame<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false
type IsAssignable<A, B> = [A] extends [B] ? true : false
type OK = { ok: 'ok' }

export type Merge<T extends object> = { [K in keyof T]: T[K] }
export type Simplify<T> = T extends any ? { [P in keyof T]: T[P] } : never

expectType<1>().toBeAssignableTo<number>().ok
expectType<number>().notToBeAssignableTo<1>().ok
expectType<1>().toBeAssignableTo<1>().ok

// expectType<number>().toBeAssignableTo<1>().ok
