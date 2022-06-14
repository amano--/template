import { DeliveryProviderTag, DeliveryMethodTagAll } from '../../src/delivery/DeliveryProvider'

type DeliveryOrder = {
  userId: string
  purchaseId: string
  providerId: DeliveryProviderTag
  deliveryMethodId: DeliveryMethodTagAll
  orderAt: Date
}
