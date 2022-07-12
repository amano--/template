import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { addCart, Product, ProductId } from '@alike-ddd/purchase'
import { newUsecaseLineHook } from './usecase'

export const useAddCart = newUsecaseLineHook(addCart, {
  c: 'CartAdd',
  productId: '',
})

export const useRelatedProductList = ({
  productId,
  fetchEnabled: enabled = true,
}: {
  productId: ProductId
  fetchEnabled?: boolean
}) => {
  const event = { c: 'CartAdd', productId } as const
  const cacheKey = JSON.stringify(event)
  // const testRes = {
  //   r: 'CartAddProductOutOfStock',
  //   hoge: 'hoge foo',
  //   list: [{ productId: 'ssss' }],
  // } as const

  // const r = { isFetched: true, data: testRes }
  //const r = useQuery(event.c, () => testRes)
  const r = useQuery(cacheKey, (ctx) => addCart(event), { enabled })

  if (r.isFetched) {
    const res = r.data!
    return res.r === 'CartAddProductOutOfStock' ? res.list : undefined
  }

  return undefined
}

// export const useRelatedProductList = (props: { productId: ProductId }) => {
//   const event = { c: 'CartAdd', productId: props.productId } as const
//   const testRes = {
//     r: 'CartAddProductOutOfStock',
//     hoge: 'hoge foo',
//     list: [{ productId: 'ssss' }],
//   } as const

//   const r = { isFetched: true, data: testRes }
//   //const r = useQuery(event.c, () => testRes)
//   // const r = useQuery(event.c, () => addCart(event))

//   if (r.isFetched) {
//     const res = r.data!
//     return res.r === 'CartAddProductOutOfStock' ? res.list : undefined
//   }

//   return undefined
// }

export type RelatedProductsPanelProps = {
  productId: ProductId
  fetchEnabled?: boolean
}

export type RelatedProductsPanelState = {
  list?: Product[]
}

export const useRelatedProductsPanel = ({
  productId,
  fetchEnabled: enabled = true,
}: RelatedProductsPanelProps): RelatedProductsPanelState => {
  const event = { c: 'CartAdd', productId } as const
  const cacheKey = JSON.stringify(event)
  const res = useQuery(cacheKey, (ctx) => addCart(event), { enabled })

  const resEvent = res.data!
  if (res.isFetched) {
    if (resEvent.r === 'CartAddProductOutOfStock') {
      return { list: resEvent.list }
    }
  }

  return { list: undefined }
}

type AddCartResEvent = Awaited<ReturnType<typeof addCart>> | undefined

export const useAddCartResPanel = ({
  productId,
  fetchEnabled: enabled = true,
}: RelatedProductsPanelProps): AddCartResEvent => {
  const event = { c: 'CartAdd', productId } as const
  const cacheKey = JSON.stringify(event)
  const res = useQuery(cacheKey, (ctx) => addCart(event), { enabled })

  const resEvent = res.data!
  if (res.isFetched) {
    return resEvent
  }

  return undefined
}

export const AddCartResPanel: FC<AddCartResEvent> = (props) => {
  // TODO 言語情報の取得方法の検討 navigator.language
  switch (props?.r) {
    case 'CartAddSuccess':
      return <> {props.message()} </>
    case 'CartAddProductOutOfStock':
      return <RelatedProductsPanel list={props.list}></RelatedProductsPanel>
    default:
      return <></>
  }
}

export const RelatedProductsPanel: FC<RelatedProductsPanelState> = (props) => {
  return (
    <div>
      {props.list?.map((product) => (
        <>
          <h4>{product.productId}</h4>

          <button onClick={async () => {}}> add cart </button>
        </>
      ))}
    </div>
  )
}

export const ProductPanel: React.FC<Product> = (props) => {
  return (
    <div>
      <h1>{props.productId}</h1>
      <button
        onClick={async () => {
          const res = await addCart({ c: 'CartAdd', productId: props.productId })

          const relateList = res.r === 'CartAddProductOutOfStock' ? res.list : undefined
        }}
      >
        add cart
      </button>
    </div>
  )
}

export const CartPanel: FC = (props) => {
  // const res = await addCart({ c: 'CartAdd', productId: 'normal' })

  // const relateList = res.r === 'CartAddProductOutOfStock' ? res.list : undefined
  return (
    <div>
      {/* <h1>{props.children}</h1> */}
      <button
        onClick={async () => {
          const res = await addCart({ c: 'CartAdd', productId: 'normal' })

          const relateList = res.r === 'CartAddProductOutOfStock' ? res.list : undefined
        }}
      />
    </div>
  )
}
