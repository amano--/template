/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Select, SelectProps as DUSelectProps } from 'react-daisyui'
import { SelectProps } from '../Form'
import { ChoiceItemDef, FormDef, PickFcSetFromDefSet, SelectDef } from '../FormDef'

type PartialDUSelectProps = Partial<DUSelectProps<string>>

const defaultProps: PartialDUSelectProps = { color: 'primary', value: 'BLANK' }

const BLANK_KEY = 'BLANK'

export type SelectFormProps = SelectProps & PartialDUSelectProps

export const newSelectForm =
  <T extends Record<string, ChoiceItemDef>>(def: SelectDef<T>) =>
  ({ value, ...props }: SelectFormProps) => {
    // const [value, setValue] = useState(props.value)
    const mergedProps: SelectFormProps = {
      ...defaultProps,
      defaultValue: value ?? BLANK_KEY,
      color: props.error ? 'error' : defaultProps.color,
      ...props,
      value,
    }

    const blankItem = value === BLANK_KEY ? <Select.Option key={BLANK_KEY} value={BLANK_KEY} disabled /> : undefined
    const items = Object.values(def.items).map((itemDef) => (
      <Select.Option key={itemDef.name} value={itemDef.name} selected={itemDef.name === mergedProps.value}>
        {itemDef.label}
      </Select.Option>
    ))
    const children = blankItem ? [blankItem, ...items] : items

    return (
      <label className="label" htmlFor={def.name}>
        <span className="label-text">{def.label}</span>
        {/* <span className="label-text-alt">Alt label</span> */}
        <Select {...mergedProps}>{children}</Select>
        {props.error && <span className="text-error">{props.error}</span>}
      </label>
    )
  }
