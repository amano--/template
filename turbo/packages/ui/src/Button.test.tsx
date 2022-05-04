import React, { useEffect } from 'react'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { purchaseMock } from 'mocks'
import { Button } from './Button'
import { render, fireEvent, waitFor, screen, prettyDOM } from '@testing-library/react'

describe('simple test', () => {
  describe('simple test', () => {
    it('dom draw', () => {
      const target = render(<Button />)

      const domText = prettyDOM(target.baseElement)
      console.log(domText)

      expect(domText).toContain('Boop')
    })
  })
})
