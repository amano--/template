type View = { viewId: string; label: string }
type RawBoundedContext = { bcId: string; views: { [P: string]: View } }

const common = {
  bcId: 'common',
  views: {
    UserCreateAccount: { viewId: 'UserCreateAccount', label: 'アカウント登録画面' },
    UserCreateProfile: { viewId: 'UserCreateProfile', label: '個人情報登録画面' },
  },
} as const

const purchase = {
  bcId: 'purchase',
  views: {
    PurchaseTop: { viewId: 'PurchaseTop', label: '商品購買トップ' },
    PurchaseSettle: { viewId: 'PurchaseSettle', label: '決済画面' },
  },
} as const

type PickViewIds<BC extends RawBoundedContext> = BC['views'] extends {
  [P: string]: { viewId: infer VID }
}
  ? VID
  : never

type PickAllViewIds<ALL> = ALL extends { [P in BoundedContextId]: infer BC }
  ? BC extends RawBoundedContext
    ? PickViewIds<BC>
    : never
  : never
export type CommonViewId = PickViewIds<typeof common>
// type View = (typeof common)['views'] { viewId: 'user/create/account' } | { viewId: 'user/create/profile' }
// type ViewId = View['viewId']

const allBoundedContexts = { common, purchase }

export type AllBoundedContext = typeof allBoundedContexts
export type BoundedContextId = keyof AllBoundedContext
// export type AllViewId<BC,ALL extends { [P in BoundedContextKey]: BC extends RawBoundedContext }> = BC

export type BoundedContext<KEY extends BoundedContextId = 'common'> = AllBoundedContext[KEY]

export type AllViewId = PickAllViewIds<typeof allBoundedContexts>
