import { UserLankTag, UserLank } from '@alike-ca/common'
import { DeliveryProviderByDoraemon, packageScopeForDeliveryMethodsByDoraemon } from './provider/Doraemon'
import { DeliveryProviderByGundam, packageScopeForDeliveryMethodsByGundam } from './provider/Gundam'

/**
 *  @param dpt tagged union の Keyに使用するタグ. Delivery Provider Tag の略。
 */
export type DeliveryP = {
  dpt: DeliveryProviderTag

  label: string
  desc: string
}

/**
 *  @param dpt tagged union の Keyに使用するタグ. Delivery Provider Tag の略。
 *  @param dmt tagged union の Keyに使用するタグ. Delivery Method Tag の略。
 */
export type DeliveryMethod = {
  dpt: DeliveryProviderTag
  // TODO 多分できないと思うが dpt の値に従って DeliveryMethodTag<> のように適切な Union型の提示方法
  // 一応補完の歯やすさを考慮しこうしている
  dmt: DeliveryMethodTagAll

  label: string
  desc: string
  comment: string
  allowLanks: readonly [UserLankTag]
  priceMin: number
  priceMax: number
  estimatedTime: number
  estimatedTimeDesc: string
}

const doraemon = packageScopeForDeliveryMethodsByDoraemon
const gundam = packageScopeForDeliveryMethodsByGundam
const tree = { doraemon, gundam } as const
const list = { ...doraemon, ...gundam } as const

export type DeliveryProvider = DeliveryProviderByDoraemon | DeliveryProviderByGundam
export type DeliveryProviderTag = keyof typeof tree
export type DeliveryMethodTag<TAG extends DeliveryProviderTag> = keyof typeof tree[TAG]
export type DeliveryMethodTagAll = keyof typeof list

const get = <DPT extends DeliveryProviderTag, DMT extends DeliveryMethodTag<DPT>>(dpt: DPT, dmt: DMT) => tree[dpt][dmt]

const findByUserLank = (lank: UserLankTag | UserLank) => {
  const userLankTag = typeof lank === 'string' ? lank : lank.ult
  const arr = Object.entries(list).filter(([, v]) => v.allowLanks.some((ult) => ult === userLankTag))
  return Object.fromEntries(arr)
}

export const DeliveryProvider = { tree, list, get, findByUserLank }
