import React from 'react'
import { Button } from '@alike-ca/react-libs'
import { addCart } from '@alike-ca/purchase'

export default function Web() {
  const cart = addCart({ c: 'CartAdd', productId: 'normal' })
  return (
    <div>
      <h1>Web</h1>
      <Button />
    </div>
  )
}
