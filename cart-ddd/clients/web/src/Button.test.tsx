import React, { useEffect } from 'react'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { render, fireEvent, waitFor, screen, prettyDOM } from '@testing-library/react'
import { Button } from '@alike-ca/react-libs'

describe('simple test', () => {
  it('dom draw', () => {
    const target = render(<Button />)

    const domText = prettyDOM(target.baseElement)
    console.log(domText)

    expect(domText).toContain('Boop')
  })
})
