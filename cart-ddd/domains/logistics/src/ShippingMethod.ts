type ShippingMethodByDoraemon = { utag: 'doraemon' }

type DeliverySpec = {
  label: string
  desc: string
  comment: string
  priceMin: number
  priceMax: number
  estimatedTime: number
  estimatedTimeDesc: string
}

type Doraemon = DeliverySpec & {
  utag: 'dora'
}

const dora: Doraemon = {
  utag: 'dora',
  label: 'ドラえもん配送',
  desc: '主にどこでもドアによる配送になります。タイムマシンオプションを使用すると時間を指定した配送(過去指定は応相談(1億~))が可能になります',
  comment: '時を越えた世界最速の配送を実現します',
  priceMin: 1_0000,
  priceMax: 10_0000_0000,
  estimatedTime: 0,
  estimatedTimeDesc: 'オプション次第で時間はどうとでもなるので、0秒とさせていただきました',
}

type ShippingMethodByGundam = { utag: 'gundam' }

export type ShippingMethod = ShippingMethodByDoraemon | ShippingMethodByGundam
