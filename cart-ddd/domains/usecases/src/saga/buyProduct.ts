import { selectAd } from '../selectAd'
import { listRecommendProducts } from '../purchase'

// const buyProduct = [selectAd, listRecommendProducts]

const buyProduct = { selectAd, listRecommendProducts }

export type PickUsecaseInOut<A> = {
  [P in keyof A]: A[P] extends (e: infer EVENT) => Promise<infer RESULT> ? [EVENT, RESULT] : never
}

// type a = PickUsecaseInOut<typeof buyProduct>
