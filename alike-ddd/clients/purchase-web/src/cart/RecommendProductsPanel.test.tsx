import React from 'react'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRecommendProducts } from './RecommendProductsPanel'

const wrapper = (props: any) => <QueryClientProvider client={new QueryClient()}>{props.children}</QueryClientProvider>

describe('useRecommendProductsPanel', () => {
  it('render hook', async () => {
    const { result } = renderHook(() => useRecommendProducts({ input: { keyword: 'hoge' } }), {
      wrapper,
    })

    expect(result.current).toEqual(undefined)

    await waitFor(() => {
      expect(result.current).toMatchObject({
        list: [{ productId: 'normal' }, { productId: 'relate1' }],
        r: 'ListQuerySuccess',
        rt: 'success',
      })
    })
  })
})
