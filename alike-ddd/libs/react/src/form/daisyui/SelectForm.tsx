/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps as DUSelectProps } from 'react-daisyui'
import { SelectProps } from '../Form'
import { ChoiceItemDef, SelectDef } from '../FormDef'

const BLANK_KEY = 'BLANK'

type PartialDUSelectProps = Partial<DUSelectProps<string>>

const defaultProps: PartialDUSelectProps = { color: 'primary', value: BLANK_KEY }

export type SelectFormProps = SelectProps & PartialDUSelectProps

const blankItemElement = (
  <option key={BLANK_KEY} value={BLANK_KEY} disabled>
    選択してください
  </option>
)

export const newSelectForm = <T extends Record<string, ChoiceItemDef>>(def: SelectDef<T>) => {
  const calcSelectOptions = (selectedValue: string = BLANK_KEY) => {
    const blankItem = selectedValue === BLANK_KEY ? blankItemElement : undefined

    // react-daisyui の Select.Option の selected が機能していないので option を使う
    const items = Object.values(def.items).map((itemDef) => (
      <option key={itemDef.name} value={itemDef.name} selected={itemDef.name === selectedValue}>
        {itemDef.label}
      </option>
    ))

    const options = blankItem ? [blankItem, ...items] : items

    // console.log('calcSelectOptions : selectedValue=', selectedValue)
    // console.log('calcSelectOptions : options=', options)

    return options
  }

  return ({ ...props }: SelectFormProps) => {
    // const [value, setValue] = useState(props.value)
    const mergedProps: SelectFormProps = {
      ...defaultProps,
      defaultValue: props.value ?? BLANK_KEY,
      color: props.error ? 'error' : defaultProps.color,
      ...props,
      // value: props.value ?? BLANK_KEY,
    }

    // console.log('newSelectForm :mergedProps=', mergedProps)
    return (
      <label className="label" htmlFor={def.name}>
        <span className="label-text">{def.label}</span>
        {/* <span className="label-text-alt">Alt label</span> */}
        <Select {...mergedProps}>{calcSelectOptions(props.value)}</Select>
        {props.error && <span className="text-error">{props.error}</span>}
      </label>
    )
  }
}
