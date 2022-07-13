import React, { useEffect } from 'react'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { render, renderHook, fireEvent, waitFor, screen, prettyDOM } from '@testing-library/react'
import { Button } from '@alike-ddd/react-libs'
import { ProductPanel, useAddCart, useRelatedProductList } from './CartPanel'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRecommendProducts } from './RecommendProductsPanel'

const wrapper = (props: any) => <QueryClientProvider client={new QueryClient()}>{props.children}</QueryClientProvider>

describe('simple test', () => {
  it('dom draw2', () => {
    const target = render(<ProductPanel productId={'outOfStock'} />)

    const domText = prettyDOM(target.baseElement)
    console.log(domText)

    expect(domText).toContain('outOfStock')
  })
})

describe('useRelatedProductList', () => {
  it('render hook', async () => {
    const { result } = renderHook(() => useRelatedProductList({ productId: 'outOfStock' }), {
      wrapper,
    })

    expect(result.current).toEqual(undefined)

    await waitFor(() => {
      expect(result.current).toEqual([{ productId: 'relate1' }, { productId: 'relate2' }])
    })
  })
  it('mount時 fetch しないことを確認', async () => {
    const { result } = renderHook(() => useRelatedProductList({ productId: 'outOfStock', fetchEnabled: false }), {
      wrapper,
    })

    expect(result.current).toEqual(undefined)

    await waitFor(() => {
      expect(result.current).toEqual(undefined)
    })
  })
})

describe('useAddCart', () => {
  it('render hook', async () => {
    const { result } = renderHook(() => useAddCart({ productId: 'outOfStock' }), {
      wrapper,
    })

    expect(result.current).toEqual(undefined)

    await waitFor(() => {
      expect(result.current).toMatchObject({
        list: [{ productId: 'relate1' }, { productId: 'relate2' }],
        r: 'CartAddProductOutOfStock',
        rt: 'alt',
      })
    })
  })
})
