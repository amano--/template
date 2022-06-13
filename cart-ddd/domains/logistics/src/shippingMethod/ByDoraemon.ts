import { UserLank } from '@alike-ca/common'
import { DeliverySpec } from './ShippingMethod'

type DeliverySpecByDoraemon = DeliverySpec & {
  smt: 'doraemon'
  dst: 'dora'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  yojigenPocket: () => string
}

const dora: DeliverySpecByDoraemon = {
  smt: 'doraemon',
  dst: 'dora',
  label: 'ドラえもん配送',
  desc: '主にどこでもドアによる配送になります。タイムマシンオプションを使用すると時間を指定した配送(過去指定は応相談(1億~))が可能になります',
  allowLanks: ['Platinum'],
  comment: '時を越えた世界最速の配送を実現します',
  priceMin: 1_0000,
  priceMax: 10_0000_0000,
  estimatedTime: 0,
  estimatedTimeDesc: 'オプション次第で時間はどうとでもなるので、0時間とさせていただきました',

  yojigenPocket: () => 'はい、タケコプター',
} // as const

type DeliverySpecBySuneo = DeliverySpec & {
  smt: 'doraemon'
  dst: 'suneo'

  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  summonMama: () => string
}

const suneo: DeliverySpecBySuneo = {
  smt: 'doraemon',
  dst: 'suneo',
  label: 'スネ夫のクール宅急便',
  desc: 'クールな態度で配送するだけなので、なまものを送っても普通に腐るのでご注意ください',
  allowLanks: UserLank.overLankKeys('Silver'),
  comment: 'コスト度外視のゴージャスな配送を目指します',
  priceMin: 1_0000,
  priceMax: 10_0000,
  estimatedTime: 24,
  estimatedTimeDesc: '無意味に値段が高いだけで、配送時間は至って普通です。マニア向けのプランになっております',

  summonMama: () => 'スネちゃま、おこずかいあげる',
}

export const packageScopeForDeliverySpecsByDoraemon = { dora, suneo }
const forTypeCheck: { [P: string]: DeliverySpec } = packageScopeForDeliverySpecsByDoraemon

export type ShippingMethodByDoraemon = DeliverySpecByDoraemon | DeliverySpecBySuneo
export type ShippingMethodByDoraemonKey = ShippingMethodByDoraemon['dst']
