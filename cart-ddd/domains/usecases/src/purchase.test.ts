import { addCart } from './purchase'

describe('simple test', () => {
  it('addCart', async () => {
    // TODO 実行結果が補完(型推論)されない問題の解決
    expect(await addCart({ c: 'CartAdd', productId: 'normal' })).toMatchObject({ r: 'CartAddSuccess' })

    expect(await addCart({ c: 'CartAdd', productId: 'outOfStock' })).toMatchObject({ r: 'CartAddProductOutOfStock' })
  })
})
