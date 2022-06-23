import { UserLank } from '@alike-ddd/common'
import type { DeliveryMethod, DeliveryProvider } from '../DeliveryProvider'

type DeliveryMethodByGufu = DeliveryMethod & {
  dpt: 'gundam'
  dmt: 'gufu'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  zakutoHaChigau: () => string
}

const gufu: DeliveryMethodByGufu = {
  dpt: 'gundam',
  dmt: 'gufu',
  label: 'ランバ・ラルの いくさ馬鹿急便',
  desc: 'なぜか必ず砂漠を通って配達されるので、砂まみれになっていることがあります。返品不可',
  allowLanks: UserLank.overLankTags('Bronze'),
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
  label: 'ガンダムの宇宙世紀配送',
  desc: 'モビルスーツのエネルギー源は核融合炉なので、それなりのコストが掛かります。',
  allowLanks: UserLank.overLankTags('Gold'),
  comment: '僕が一番、荷物をうまく運べるんだ。',
  priceMin: 100_0000,
  priceMax: 1000_0000,
  estimatedTime: 1,
  estimatedTimeDesc:
    '配送経路に細い道がある場合、物損事故の対応等の理由により遅れる場合がございます。予めご承知おきください',

  naguttane: () => '殴ったね、ジオングにも殴られたことないのに',
}

const methods = { gufu, gundam } as const

export const packageScopeForDeliveryProviderByGundam: DeliveryProvider<typeof methods> = {
  dpt: 'gundam',
  label: 'ガンダム運送',
  desc: 'ガンダムファミリーが経営する運送会社です',
  methods,
} as const
