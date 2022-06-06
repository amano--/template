import React, { FC } from 'react'
import { useQuery } from 'react-query'
import { addCart, Product, ProductId } from '@alike-ca/purchase'

export const useRelatedProductList = (props: { productId: ProductId }) => {
  const event = { c: 'CartAdd', productId: props.productId } as const
  // const testRes = {
  //   r: 'CartAddProductOutOfStock',
  //   hoge: 'hoge foo',
  //   list: [{ productId: 'ssss' }],
  // } as const

  // const r = { isFetched: true, data: testRes }
  //const r = useQuery(event.c, () => testRes)
  const r = useQuery(JSON.stringify(event), () => addCart(event))

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

export const ProductPanel: React.FC<Product> = (props) => {
  return (
    <div>
      <h1>{props.productId}</h1>
      <button
        onClick={async () => {
          const res = await addCart({ c: 'CartAdd', productId: props.productId })

          const relateList = res.r === 'CartAddProductOutOfStock' ? res.list : undefined
        }}
      />
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
