const simpleProducts = { normal: { productId: 'normal' }, outOfStock: { productId: 'outOfStock' } } as const

const relatedProducts = { relate1: { productId: 'relate1' }, relate2: { productId: 'relate2' } } as const

// [ TypeScript で string 型の値に自動補完を効かせる ](https://nanto.asablo.jp/blog/2021/09/11/9422241)
export const MockProducts = { ...simpleProducts, ...relatedProducts } as const
/**
 * normal - 普通の商品。
 * outOfStock - 品切れ状態の商品
 * relate1 - 関連商品 例1
 * relate２ - 関連商品 例2
 */
export type MockProductIdType = keyof typeof MockProducts | (string & {})
