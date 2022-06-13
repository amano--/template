import { UserLankKey, UserLank } from '@alike-ca/common'
/**
 *  @param smt tagged union の Keyに使用するタグ. ShippingMethod Tag の略。
 *  @param dst tagged union の Keyに使用するタグ. Delivery Spec Tag の略。
 */
type DeliverySpec = {
  smt: string
  dst: string

  label: string
  desc: string
  comment: string
  allowLank: [UserLankKey]
  priceMin: number
  priceMax: number
  estimatedTime: number
  estimatedTimeDesc: string
}

type Doraemon = DeliverySpec & {
  smt: 'doraemon'
  dst: 'dora'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  yojigenPocket: () => string
}

const dora: Doraemon = {
  smt: 'doraemon',
  dst: 'dora',
  label: 'ドラえもん配送',
  desc: '主にどこでもドアによる配送になります。タイムマシンオプションを使用すると時間を指定した配送(過去指定は応相談(1億~))が可能になります',
  allowLank: ['Platinum'],
  comment: '時を越えた世界最速の配送を実現します',
  priceMin: 1_0000,
  priceMax: 10_0000_0000,
  estimatedTime: 0,
  estimatedTimeDesc: 'オプション次第で時間はどうとでもなるので、0時間とさせていただきました',

  yojigenPocket: () => 'はい、タケコプター',
}

type Suneo = DeliverySpec & {
  smt: 'doraemon'
  dst: 'suneo'

  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  summonMama: () => string
}

const suneo: Suneo = {
  smt: 'doraemon',
  dst: 'suneo',
  label: 'スネ夫のクール宅急便',
  desc: 'クールな態度で配送するだけなので、なまものを送っても普通に腐るのでご注意ください',
  allowLank: UserLank.overLankKeys('Gold'),
  comment: 'コスト度外視のゴージャスな配送を目指します',
  priceMin: 1_0000,
  priceMax: 10_0000,
  estimatedTime: 24,
  estimatedTimeDesc: '無意味に値段が高いだけで、配送時間は至って普通です。マニア向けのプランになっております',

  summonMama: () => 'スネちゃま、おこずかいあげる',
}

type ShippingMethodByDoraemon = Doraemon | Suneo
type ShippingMethodByDoraemonKey = ShippingMethodByDoraemon['dst']

type Gufu = DeliverySpec & {
  smt: 'gundam'
  dst: 'gufu'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  zakutoHaChigau: () => string
}

type Gundam = DeliverySpec & {
  smt: 'gundam'
  dst: 'gundam'

  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  beamSaber: () => string
}
type ShippingMethodByGundam = Gufu | Gundam
type ShippingMethodByGundamKey = ShippingMethodByGundam['dst']

export type ShippingMethod = ShippingMethodByDoraemon | ShippingMethodByGundam
export type ShippingMethodKey = ShippingMethod['smt']

const get = <SMT extends ShippingMethodKey,DST extends ShippingMethodKey >(key: SMT) => lanks[key]

export const ShippingMethod = {}
