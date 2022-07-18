import { assignLogger, pickLogCategory } from '@alike-ddd/common'

const logger = assignLogger(pickLogCategory(__dirname))

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type CouponId = string //MockcouponIdType
export type Coupon = { couponId: CouponId }

logger.debug('hoge')

export const priceDown = { amount: 100 } as const

export const Coupon = { priceDown }
