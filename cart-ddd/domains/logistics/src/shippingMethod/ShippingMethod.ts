import { UserLankTag, UserLank } from '@alike-ca/common'
import { packageScopeForDeliverySpecsByDoraemon, ShippingMethodByDoraemon } from './ByDoraemon'
import { ShippingMethodByGundam, packageScopeForDeliverySpecsByGundam } from './ByGundam'
/**
 *  @param smt tagged union の Keyに使用するタグ. ShippingMethod Tag の略。
 *  @param dst tagged union の Keyに使用するタグ. Delivery Spec Tag の略。
 */
export type DeliverySpec = {
  smt: ShippingMethodTag
  // TODO 多分できないと思うが smt の値に従って DeliverySpecTag<> のように適切な Union型の提示方法
  // 一応補完の歯やすさを考慮しこうしている
  dst: DeliverySpecTagAll

  label: string
  desc: string
  comment: string
  allowLanks: readonly [UserLankTag]
  priceMin: number
  priceMax: number
  estimatedTime: number
  estimatedTimeDesc: string
}

const doraemon = packageScopeForDeliverySpecsByDoraemon
const gundam = packageScopeForDeliverySpecsByGundam
const tree = { doraemon, gundam } as const
const list = { ...doraemon, ...gundam } as const

export type ShippingMethod = ShippingMethodByDoraemon | ShippingMethodByGundam
export type ShippingMethodTag = keyof typeof tree
export type DeliverySpecTag<SMT extends ShippingMethodTag> = keyof typeof tree[SMT]
export type DeliverySpecTagAll = keyof typeof list

const get = <SMT extends ShippingMethodTag, DST extends DeliverySpecTag<SMT>>(smt: SMT, dst: DST) => tree[smt][dst]

const findByUserLank = (lank: UserLank) => {
  const arr = Object.entries(list).filter(([, v]) => v.allowLanks.some((ult) => ult === lank.ult))
  return Object.fromEntries(arr)
}

export const ShippingMethod = { tree, list, get, findByUserLank }

// const a: DeliverySpec = { smt: 'doraemon', dst: 'dora' }
