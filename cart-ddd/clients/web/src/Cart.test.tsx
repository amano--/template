import React, { useEffect } from 'react'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { render, renderHook, fireEvent, waitFor, screen, prettyDOM } from '@testing-library/react'
import { Button } from '@alike-ca/react-libs'
import { ProductPanel, useRelatedProductList } from './Cart'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('simple test', () => {
  it('dom draw2', () => {
    const target = render(<ProductPanel productId={'outOfStock'} />)

    const domText = prettyDOM(target.baseElement)
    console.log(domText)

    expect(domText).toContain('Boop')
  })
})

describe('useRelatedProductList', () => {
  const wrapper = (props: any) => <QueryClientProvider client={new QueryClient()}>{props.children}</QueryClientProvider>

  it('render hook', async () => {
    const { result } = renderHook(() => useRelatedProductList({ productId: 'outOfStock' }), { wrapper })

    expect(result.current).toEqual(undefined)

    await waitFor(() => {
      expect(result.current).toEqual([{ productId: 'relate1' }, { productId: 'relate2' }])
    })

    //   await rerender()
    //   expect(result.current).toContain('Boop')
  })
})
