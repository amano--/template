import { UserLank } from '@alike-ca/common'
import { DeliverySpec } from './ShippingMethod'

type DeliverySpecByGufu = DeliverySpec & {
  smt: 'gundam'
  dst: 'gufu'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  zakutoHaChigau: () => string
}

const gufu: DeliverySpecByGufu = {
  smt: 'gundam',
  dst: 'gufu',
  label: 'スネ夫のクール宅急便',
  desc: 'クールな態度で配送するだけなので、なまものを送っても普通に腐るのでご注意ください',
  allowLanks: UserLank.overLankKeys('Bronze'),
  comment: 'コスト度外視のゴージャスな配送を目指します',
  priceMin: 1_0000,
  priceMax: 10_0000,
  estimatedTime: 24,
  estimatedTimeDesc: '無意味に値段が高いだけで、配送時間は至って普通です。マニア向けのプランになっております',

  zakutoHaChigau: () => 'ザクとは違うのだよ、ザクとは',
} //as const

type DeliverySpecByGundam = DeliverySpec & {
  smt: 'gundam'
  dst: 'gundam'

  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  naguttane: () => string
}

const gundam: DeliverySpecByGundam = {
  smt: 'gundam',
  dst: 'gundam',
  label: 'スネ夫のクール宅急便',
  desc: 'クールな態度で配送するだけなので、なまものを送っても普通に腐るのでご注意ください',
  allowLanks: UserLank.overLankKeys('Gold'),
  comment: 'コスト度外視のゴージャスな配送を目指します',
  priceMin: 1_0000,
  priceMax: 10_0000,
  estimatedTime: 24,
  estimatedTimeDesc: '無意味に値段が高いだけで、配送時間は至って普通です。マニア向けのプランになっております',

  naguttane: () => '殴ったね、ジオングにも殴られたことないのに',
} //as const

export const packageScopeForDeliverySpecsByGundam = { gufu, gundam } as const
const forTypeCheck: { [P: string]: DeliverySpec } = packageScopeForDeliverySpecsByGundam

export type ShippingMethodByGundam = DeliverySpecByGufu | DeliverySpecByGundam
export type ShippingMethodByGundamKey = ShippingMethodByGundam['dst']
