import { UserLank } from '@alike-ca/common'
import { DeliveryMethod } from '../DeliveryProvider'

type DeliveryMethodByGufu = DeliveryMethod & {
  dpt: 'gundam'
  dmt: 'gufu'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  zakutoHaChigau: () => string
}

const gufu: DeliveryMethodByGufu = {
  dpt: 'gundam',
  dmt: 'gufu',
  label: 'ランバ・ラルの戦馬鹿急便',
  desc: 'なぜか必ず砂漠を通って配達されるので、砂まみれになっていることがあります。返品不可',
  allowLanks: UserLank.overLankKeys('Bronze'),
  comment: 'ザクとの違いをみせてやろう',
  priceMin: 1000,
  priceMax: 1_0000,
  estimatedTime: 48,
  estimatedTimeDesc: '近くに砂漠がない場合、予測より時間がかかる場合があります',

  zakutoHaChigau: () => 'ザクとは違うのだよ、ザクとは',
} //as const

type DeliveryMethodByGundam = DeliveryMethod & {
  dpt: 'gundam'
  dmt: 'gundam'

  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  naguttane: () => string
}

const gundam: DeliveryMethodByGundam = {
  dpt: 'gundam',
  dmt: 'gundam',
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

export const packageScopeForDeliveryMethodsByGundam = { gufu, gundam } as const
const forTypeCheck: { [P: string]: DeliveryMethod } = packageScopeForDeliveryMethodsByGundam

export type DeliveryProviderByGundam = DeliveryMethodByGufu | DeliveryMethodByGundam
export type DeliveryProviderByGundamKey = DeliveryProviderByGundam['dmt']
