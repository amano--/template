/* eslint-disable */
export type DeliveryMethodTagAll = 'dora' | 'gufu' | 'gundam' | 'suneo'

export type DeliveryProviderTag = 'doraemon' | 'gundam'

export type DeliveryOrder = {
  deliveryMethodId?: DeliveryMethodTagAll | undefined

  orderAt?: {
    format?: string | undefined
    title?: string | undefined
    type?: string | undefined
  } | undefined

  providerId?: DeliveryProviderTag | undefined

  purchaseId?: {
    title?: string | undefined
    type?: string | undefined
  } | undefined

  userId?: {
    title?: string | undefined
    type?: string | undefined
  } | undefined
}
