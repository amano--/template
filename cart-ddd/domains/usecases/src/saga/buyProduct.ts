import { selectAd } from '../selectAd'
import { listRecommendProducts } from '../purchase'

const buyProduct = [selectAd, listRecommendProducts]

type A = Partial<B>
// type PickInOut<L> = [][I in L] ? (I extends (a: infer A) => infer R ? [A, R] : never) : never

type PickInOut<L> = L extends Array<infer I> ? (I extends (a: infer A) => Promise<infer R> ? [A, R] : never) : never

type V = PickInOut<typeof buyProduct>
