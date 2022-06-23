/* eslint-disable */
export type NormalOption = {
  optionTag?: 'Normal' | undefined
  name?: '通常オプション' | undefined
  okihai?: boolean | undefined
}

export type DoraemonOption = {
  optionTag?: 'Doraemon' | undefined
  name?: 'ドラえもんオプション' | undefined
  takekoputaerPresent?: boolean | undefined
}

export type DeliveryOrder = {
  userId?: string | undefined
  purchaseId?: string | undefined
  providerId?: 'doraemon' | 'gundam' | undefined
  deliveryMethodId?: 'dora' | 'gufu' | 'gundam' | 'suneo' | undefined
  orderAt?: string | undefined
}
