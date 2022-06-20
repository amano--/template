import { UserLank } from '@alike-ca/common'
import type { DeliveryMethod, DeliveryProvider } from '../DeliveryProvider'

type DeliveryMethodByDoraemon = DeliveryMethod & {
  dpt: 'doraemon'
  dmt: 'dora'
  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  yojigenPocket: () => string
}

const dora: DeliveryMethodByDoraemon = {
  dpt: 'doraemon',
  dmt: 'dora',
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

type DeliveryMethodBySuneo = DeliveryMethod & {
  dpt: 'doraemon'
  dmt: 'suneo'

  // 個別typeの固有メソッドが呼べることを確認するためだけの適当なメソッド
  summonMama: () => string
}

const suneo: DeliveryMethodBySuneo = {
  dpt: 'doraemon',
  dmt: 'suneo',
  label: 'スネ夫のクール宅急便',
  desc: 'クールな態度で配送するだけなので、なまものを送っても普通に腐るのでご注意ください',
  allowLanks: UserLank.overLankTags('Silver'),
  comment: 'コスト度外視のゴージャスな配送を目指します',
  priceMin: 1_0000,
  priceMax: 10_0000,
  estimatedTime: 24,
  estimatedTimeDesc: '無意味に値段が高いだけで、配送時間は至って普通です。マニア向けのプランになっております',

  summonMama: () => 'スネちゃま、おこずかいあげる',
}

const methods = { dora, suneo } as const

export const packageScopeForDeliveryProviderByDoraemon: DeliveryProvider<typeof methods> = {
  dpt: 'doraemon',
  label: 'ドラえもん運輸',
  desc: 'ドラえもんファミリーが経営する運送会社です',
  methods,
} as const
