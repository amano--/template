import { UserLankTag, UserLank } from '@alike-ca/common'
import { packageScopeForDeliveryProviderByDoraemon } from './provider/Doraemon'
import { packageScopeForDeliveryProviderByGundam } from './provider/Gundam'

/**
 *  @param dpt tagged union の Keyに使用するタグ. Delivery Provider Tag の略。
 */
export type DeliveryProvider<T extends Record<string, DeliveryMethod>> = {
  dpt: DeliveryProviderTag

  label: string
  desc: string

  methods: T
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

const doraemon = packageScopeForDeliveryProviderByDoraemon
const gundam = packageScopeForDeliveryProviderByGundam
const list = { doraemon, gundam } as const
const methods = { ...doraemon.methods, ...gundam.methods } as const

// type DeliveryProvider = DeliveryProviderByDoraemon | DeliveryProviderByGundam
export type DeliveryProviderTag = keyof typeof list
export type DeliveryMethodTag<TAG extends DeliveryProviderTag> = keyof typeof list[TAG]['methods']
// type a = DeliveryMethodTag<'gundam'>
export type DeliveryMethodTagAll = keyof typeof methods

type MethodsTypeAtNarrowingByDeliveryProviderTag<TAG extends DeliveryProviderTag> = typeof list[TAG]['methods']
// type b = MethodsTypeAtNarrowingByDeliveryProviderTag<'gundam'>

//TODO かなり無理矢理型つけをしてみたが 他に良い方法がないか調査
const get = <
  DPT extends DeliveryProviderTag,
  DMT extends DeliveryMethodTag<DPT>,
  METHODS extends MethodsTypeAtNarrowingByDeliveryProviderTag<DPT>
>(
  dpt: DPT,
  dmt: DMT
) => (list[dpt]['methods'] as METHODS)[dmt]

const findByUserLank = (lank: UserLankTag | UserLank) => {
  const userLankTag = typeof lank === 'string' ? lank : lank.ult
  const arr = Object.entries(methods).filter(([, v]) => v.allowLanks.some((ult) => ult === userLankTag))
  return Object.fromEntries(arr)
}

// TODO list 等の内部データ構造を公開することの是非についての検討
// export const DeliveryProvider = { list, methods, get, findByUserLank }
export const DeliveryProvider = { get, findByUserLank }
