import { FC } from 'react'
import { Input, InputProps, Select, SelectProps as DUSelectProps } from 'react-daisyui'
import { FormProps, InputTextProps, SelectProps } from '../Form'
import { ChoiceItemDef, InputTextDef, SelectDef } from '../FormDef'

const defaultInputTextForm: InputProps = { color: 'primary' }
export const InputTextForm: (def: InputTextDef) => FC<InputTextProps & InputProps> = (def: InputTextDef) => (props) => {
  const mergedProps = { ...defaultInputTextForm, ...props }

  return <Input {...mergedProps} />
}

type PartialDUSelectProps = Partial<DUSelectProps<'string'>>
const defaultSelectForm: PartialDUSelectProps = { color: 'primary' }
export const SelectForm: <T extends Record<string, ChoiceItemDef>>(
  def: SelectDef<T>
) => FC<SelectProps & PartialDUSelectProps> =
  <T extends Record<string, ChoiceItemDef>>(def: SelectDef<T>) =>
  (props) => {
    const mergedProps = { ...defaultSelectForm, ...props }

    return (
      <Select {...mergedProps}>
        {Object.values(props.itemDefs).map((itemDef) => (
          <Select.Option key={itemDef.name} value={itemDef.name}>
            {itemDef.label}
          </Select.Option>
        ))}
      </Select>
    )
  }

// const select =
//   (def: SelectDef, defaultProps: SelectProps) =>
//   (props: SelectProps = { def, ...defaultProps }) => {
//     return <SelectForm {...props} />
//   }

const formSet = { text: InputTextForm, select: SelectForm } as const

// TODO 多分不可能だと思うが、本当は 右辺の型を Record<FormTag,(props: FormProps) => JSX.Element> のように 厳密にチェックしたいが方法がわからない
// const forTypeCheck: Record<FormTag, unknown> = formSet

export const Form = (props: FormProps) => {
  switch (props.ft) {
    case 'text':
      return formSet['text'](props)
    case 'select':
      return formSet['select'](props)

    //網羅性のチェックのためのコード
    default:
      const forExhaustiveCheck: never = props
      // ここに到達することは通常ないが 戻り値の推論型から undefined を消すため定義
      return <></>
  }
}

// const createForm = (props: FormProps) => {
//     switch (props.ft) {
//       case 'text':
//         return set['text']
//       case 'select':
//         return set['select']

//       //網羅性のチェックのためのコード
//       default:
//         const forExhaustiveCheck: never = props
//     }
//   }
