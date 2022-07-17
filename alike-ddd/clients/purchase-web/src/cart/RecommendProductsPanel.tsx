import React, { FC, useState } from 'react'
import { atom, useSetRecoilState } from 'recoil'
import { addCart, listRecommendProducts, Product, ProductId } from '@alike-ddd/purchase'

import { newHookForUsecaseLine, PickInputEvent, PickOutputEvent, HookForUsecaseLineOptions } from './usecase'
import { Button, Card, Stack } from 'react-daisyui'

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

const selectedProductAtAddCart = atom({
  key: 'selectedProductAtAddCart', // globalに一意なキー
  default: { productId: '', fetchEnabled: false },
})
const ProductPanel: FC<Product> = (props) => {
  const setProduct = useSetRecoilState(selectedProductAtAddCart)

  return (
    <Card>
      {/* <Card.Image src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" /> */}
      <Card.Body className="items-center text-center">
        <Card.Title tag="h2">商品ID = {props.productId}</Card.Title>
        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
        <Card.Actions className="justify-end">
          <Button
            color="primary"
            onClick={async () => {
              setProduct({ productId: props.productId, fetchEnabled: true })
            }}
          >
            カートに追加する
          </Button>
        </Card.Actions>
      </Card.Body>
    </Card>
  )
}

export const RecommendProductsPC: FC<State> = (props) => {
  return (
    <div>
      <h4>RecommendProductsPanel</h4>
      <div>
        <p>message = {props?.message('ja')({ count: props?.list.length })}</p>
      </div>
      <Stack >
        {props?.list?.map((product) => (
          <ProductPanel {...product}></ProductPanel>
        ))}
      </Stack>
    </div>
  )
}

export const RecommendProductsPanel: FC<Props> = (props) => {
  const state = useRecommendProducts(props)
  // const [product, setProduct] = useState({ productId: '', fetchEnabled: false })

  return state ? <RecommendProductsPC {...state}></RecommendProductsPC> : <></>
}
