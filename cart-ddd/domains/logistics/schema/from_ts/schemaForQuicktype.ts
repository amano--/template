// import { DeliveryProviderTag, DeliveryMethodTagAll } from '../../src/delivery/DeliveryProvider'

// type DeliveryOrder1 = {
//   userId: string
//   purchaseId: string
//   providerId: DeliveryProviderTag
//   deliveryMethodId: DeliveryMethodTagAll
//   orderAt: Date
// }

type NormalOption = {
  optionTag: 'Normal'
  name: '通常オプション'
  okihai: boolean
}

type DoraemonOption = {
  optionTag: 'Doraemon'
  name: 'ドラえもんオプション'
  takekoputaerPresent: boolean
}

// Union型の扱いを確認するためのType
// type DeliveryOption = NormalOption | DoraemonOption

// quicktype で import の解決ができないようなのでとりあえず直接型を展開してみた
type DeliveryOrder = {
  userId: string
  purchaseId: string
  providerId: 'doraemon' | 'gundam'
  deliveryMethodId: 'gufu' | 'gundam' | 'dora' | 'suneo'
  option: [NormalOption | DoraemonOption]
  orderAt: Date
}
