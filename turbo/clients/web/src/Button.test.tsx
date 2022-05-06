import React, { useEffect } from 'react'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { purchaseMock } from 'mocks'
import { render, fireEvent, waitFor, screen, prettyDOM } from '@testing-library/react'
import { Button } from '@me/react-libs'
import { purchaseHoge } from '@me/purchase'

describe('simple test', () => {
  it('dom draw', () => {
    const target = render(<Button />)

    const domText = prettyDOM(target.baseElement)
    console.log(domText)

    expect(domText).toContain('Boop')

    expect(purchaseHoge).toContain('purchaseHoge')
    expect(purchaseMock).toContain('purchaseMock')
  })
})
