// import { DeliveryProviderTag, DeliveryMethodTagAll } from '../../src/delivery/DeliveryProvider'

// type DeliveryOrder1 = {
//   userId: string
//   purchaseId: string
//   providerId: DeliveryProviderTag
//   deliveryMethodId: DeliveryMethodTagAll
//   orderAt: Date
// }

// quicktype で import の解決ができないようなのでとりあえず直接型を展開してみた
type DeliveryOrder = {
  userId: string
  purchaseId: string
  providerId: 'doraemon' | 'gundam'
  deliveryMethodId: 'gufu' | 'gundam' | 'dora' | 'suneo'
  orderAt: Date
}
