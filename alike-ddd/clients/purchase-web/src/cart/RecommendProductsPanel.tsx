import React, { FC, useState } from 'react'
import { addCart, listRecommendProducts, Product, ProductId } from '@alike-ddd/purchase'

import { newHookForUsecaseLine, PickInputEvent, PickOutputEvent, HookForUsecaseLineOptions } from './usecase'
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

const ProductPanel: FC<Product> = (props) => {
  
  return (
    <div>
      <h1>id = {props.productId}</h1>
      <button
        onClick={async () => {
          setProduct({ productId: props.productId, fetchEnabled: true })
        }}
      >
        add cart
      </button>
    </div>
  )
}

export const RecommendProductsPC: FC<State> = (props) => {
  return (
    <div>
      <h4>RecommendProductsPanel</h4>
      <div>
        <p>message = {props?.message('ja')({ count: props?.list.length })}</p>
      </div>
      {props?.list?.map((product) => (
        <ProductPanel {...product}></ProductPanel>
      ))}
    </div>
  )
}

export const RecommendProductsPanel: FC<Props> = (props) => {
  const state = useRecommendProducts(props)
  return state ? <RecommendProductsPC {...state}></RecommendProductsPC> : <></>
}
