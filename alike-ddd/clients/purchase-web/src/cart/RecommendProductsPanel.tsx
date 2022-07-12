import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { addCart, listRecommendProducts, Product, ProductId } from '@alike-ddd/purchase'

import { newUsecaseLineHook } from './usecase'

export const useRecommendProductsPanel = newUsecaseLineHook(listRecommendProducts, {
  q: 'ListRecommendProducts',
  input: { keyword: '' },
})

export type RecommendProductsPanelProps = {
  productId: ProductId
  fetchEnabled?: boolean
}

export type RecommendProductsPanelState = {
  list?: Product[]
}

type ResEvent = Awaited<ReturnType<typeof listRecommendProducts>> | undefined

export const RecommendProductsPanel: FC<ResEvent> = (props) => {
  return (
    <div>
      {' '}
      <h4>RecommendProductsPanel</h4>
      <div>
        <p>message = {props?.message('ja')({ count: props?.list.length })}</p>
      </div>
      {props?.list?.map((product) => (
        <>
          <h4>{product.productId}</h4>

          <button onClick={async () => {}}> button </button>
        </>
      ))}
    </div>
  )
}
