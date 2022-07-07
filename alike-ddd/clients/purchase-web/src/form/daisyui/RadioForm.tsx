/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Radio, RadioProps as DURadioProps } from 'react-daisyui'
import { RadioProps } from '../Form'
import { ChoiceItemDef, FormDef, PickFcSetFromDefSet, RadioDef } from '../FormDef'

const BLANK_KEY = 'BLANK'

const defaultProps: DURadioProps = { color: 'primary', value: BLANK_KEY }

export type RadioFormProps = RadioProps & DURadioProps & { value: string }

// const blankItemElement = (
//   <Radio key={BLANK_KEY} value={BLANK_KEY} disabled>
//     選択してください
//   </Radio>
// )

export const newRadioForm = <T extends Record<string, ChoiceItemDef>>(def: RadioDef<T>) => {
  const calcRadioOptions = (selectedValue: string = BLANK_KEY) => {
    // const blankItem = selectedValue === BLANK_KEY ? blankItemElement : undefined

    // react-daisyui の Radio.Option の Radioed が機能していないので option を使う
    const items = Object.values(def.items).map((itemDef) => (
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{itemDef.label}</span>
          <Radio
            key={itemDef.name}
            name={def.name}
            value={itemDef.name}
            checked={itemDef.name === selectedValue}
          ></Radio>
        </label>
      </div>
      // <label className="label" htmlFor={def.name}>
      //   <span className="label-text">{itemDef.label}</span>
      //   <Radio key={itemDef.name} value={itemDef.name} checked={itemDef.name === RadioedValue}></Radio>
      // </label>
    ))

    // const options = blankItem ? [blankItem, ...items] : items

    // console.log('calcRadioOptions : RadioedValue=', RadioedValue)
    // console.log('calcRadioOptions : options=', options)

    return items //options
  }

  return ({ ...props }: RadioFormProps) => {
    // const [value, setValue] = useState(props.value)
    const mergedProps: RadioFormProps = {
      ...defaultProps,
      defaultValue: props.value ?? BLANK_KEY,
      color: props.error ? 'accent' : defaultProps.color,
      ...props,
      // value: props.value ?? BLANK_KEY,
    }

    console.log('newRadioForm :mergedProps=', mergedProps)
    console.log('newRadioForm :props=', props)

    // const blankItem =
    //   props.value === BLANK_KEY ? <Radio.Option key={BLANK_KEY} value={BLANK_KEY} disabled /> : undefined
    // const items = blankItem ? [blankItem, ...Items] : Items

    return (
      <>
        <label className="label" htmlFor={def.name}>
          <span className="label-text">{def.label}</span>
          {calcRadioOptions(props.value)}
          {props.error && <span className="text-error">{props.error}</span>}
        </label>
      </>
    )
  }
}
