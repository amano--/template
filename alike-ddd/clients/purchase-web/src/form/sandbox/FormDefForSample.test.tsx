import React from 'react'
import { render, prettyDOM } from '@testing-library/react'
import { FormDefForSampleForms } from './FormDefForSample'

describe('simple test', () => {
  it('dom draw', () => {
    const Forms = FormDefForSampleForms

    const target = render(
      <>
        <Forms.name />
        <Forms.gender />
      </>
    )

    const domText = prettyDOM(target.baseElement)
    console.log(domText)
    // console.log(Forms)

    // expect(domText).toContain('Boop')
  })
})
