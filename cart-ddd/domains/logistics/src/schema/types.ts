import { DeliveryProviderTag, DeliveryMethodTagAll } from '../delivery/DeliveryProvider'
type HogeHoge = { hoge: string }

type DeliveryOrder = {
  userId: string
  purchaseId: string
  providerId: DeliveryProviderTag
  deliveryMethodId: DeliveryMethodTagAll
  orderAt: Date
}
