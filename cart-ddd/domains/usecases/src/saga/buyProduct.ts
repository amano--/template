import { selectAd } from '../selectAd'
import { listRecommendProducts } from '../purchase'

const buyProduct = [selectAd, listRecommendProducts]

const buyProduct2 = { selectAd, listRecommendProducts }

type A = Partial<B>
// type PickInOut<L> = [][I in L] ? (I extends (a: infer A) => infer R ? [A, R] : never) : never

type PickUsecaseInOut<L> = L extends Array<infer I>
  ? I extends (a: infer A) => Promise<infer R>
    ? [A, R]
    : never
  : never

type V = PickUsecaseInOut<typeof buyProduct>

type c<F> = F extends (a: infer A) => Promise<infer R> ? [A, R] : never

type aa<T> = { [P in keyof T]: T[P] }

type ab = aa<typeof buyProduct>
type d<A> = { [P in keyof A]: c<A[P]> }

type e = d<ab>

type g = 'a' | 'b'

type f<T> = { [P in keyof T]: T[P] }

type he = aa<V>

type ee = f<aa<V>>
type ac = d<typeof buyProduct2>
