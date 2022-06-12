import { UserLankKey, overLankKeys } from '../../common/src/user/lank'
/**
 *  @param smTag ShippingMethod Tag の略。tagged union の Keyに使用するタグ
 *  @param dsTag DeliverySpec Tag の略。tagged union の Keyに使用するタグ
 */
type DeliverySpec = {
  smTag: string
  dsTag: string

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
  smTag: 'doraemon'
  dsTag: 'dora'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  yojigenPocket: () => string
}

const dora: Doraemon = {
  smTag: 'doraemon',
  dsTag: 'dora',
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
  smTag: 'doraemon'
  dsTag: 'suneo'

  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  summonMama: () => string
}

const suneo: Suneo = {
  smTag: 'doraemon',
  dsTag: 'suneo',
  label: 'スネ夫のクール宅急便',
  desc: 'クールな態度で配送するだけなので、なまものを送っても普通に腐るのでご注意ください',
  allowLank: overLankKeys('Gold'),
  comment: 'コスト度外視のゴージャスな配送を目指します',
  priceMin: 1_0000,
  priceMax: 10_0000,
  estimatedTime: 24,
  estimatedTimeDesc: '無意味に値段が高いだけで、配送時間は至って普通です。マニア向けのプランになっております',

  summonMama: () => 'スネちゃま、おこずかいあげる',
}

type ShippingMethodByDoraemon = Doraemon | Suneo

type ShippingMethodByGundam = { smTag: 'gundam' }

export type ShippingMethod = ShippingMethodByDoraemon | ShippingMethodByGundam
