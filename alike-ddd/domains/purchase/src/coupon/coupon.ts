import { assignLogger } from '@alike-ddd/common'
const logger = assignLogger('domains/purchase/coupon/coupon')

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type CouponId = string //MockcouponIdType
export type Coupon = { couponId: CouponId }

// __dirname/
