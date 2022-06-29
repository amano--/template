import React, { useEffect } from 'react'
// import { purchaseMock } from '../../mocks/src/purchase/index';
import { render, fireEvent, waitFor, screen, prettyDOM } from '@testing-library/react'
import { Button } from '@alike-ddd/react-libs'
import { createForms, FormDef, InputTextDef, SelectDef, PickFcSetFromDefSet } from './FormDef'
import { formFcSetByDaisyUI } from './daisyui'
import { formDefs } from './formDefSet'

describe('simple test', () => {
  it('dom draw', () => {
    const Forms = createForms(formDefs)

    const target = render(
      <>
        <Forms.name />
        <Forms.gender />
      </>
    )

    const domText = prettyDOM(target.baseElement)
    console.log(domText)
    console.log(Forms)

    // expect(domText).toContain('Boop')
  })
})
