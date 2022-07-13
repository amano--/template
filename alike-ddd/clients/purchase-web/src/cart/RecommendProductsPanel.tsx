import React, { FC } from 'react'
import { addCart, listRecommendProducts, Product, ProductId } from '@alike-ddd/purchase'

import { newHookForUsecaseLine, PickInputEvent, PickOutputEvent } from './usecase'
import { Button } from 'react-daisyui'

export const useRecommendProducts = newHookForUsecaseLine(listRecommendProducts, {
  q: 'ListRecommendProducts',
  input: { keyword: '' },
})

type InEvent = Parameters<typeof useRecommendProducts>[0]
type OutEvent = Awaited<ReturnType<typeof useRecommendProducts>>

type Props = InEvent
type State = OutEvent

export const useAddCart = newHookForUsecaseLine(addCart, {
  c: 'CartAdd',
  productId: '',
})

export const RecommendProductsPC: FC<State> = (props) => {
  return (
    <div>
      <h4>RecommendProductsPanel</h4>
      <div>
        <p>message = {props?.message('ja')({ count: props?.list.length })}</p>
      </div>
      {props?.list?.map((product) => (
        <>
          <h4>productId = {product.productId}</h4>

          <Button onClick={async () => {}}> button </Button>
        </>
      ))}
    </div>
  )
}

export const RecommendProductsPanel: FC<Props> = (props) => {
  const state = useRecommendProducts(props)
  return state ? <RecommendProductsPC {...state}></RecommendProductsPC> : <></>
}
