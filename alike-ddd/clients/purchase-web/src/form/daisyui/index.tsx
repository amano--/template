import { Input, InputProps, Select, SelectProps as DUSelectProps } from 'react-daisyui'
import { FormProps, InputTextProps, SelectProps, FormTag } from '../Form'

const defaultInputTextForm: InputProps = { color: 'primary' }
export const InputTextForm = (props: InputTextProps & InputProps) => {
  const mergedProps = { ...defaultInputTextForm, ...props }

  return <Input {...mergedProps} />
}

type PartialDUSelectProps = Partial<DUSelectProps<'string'>>
const defaultSelectForm: PartialDUSelectProps = { color: 'primary' }
export const SelectForm = (props: SelectProps & PartialDUSelectProps) => {
  const mergedProps = { ...defaultSelectForm, ...props }

  return (
    <Select {...mergedProps} >
      {Object.values(props.itemDefs).map((itemDef) => (
        <Select.Option key={itemDef.name} value={itemDef.name}>
          {itemDef.label}
        </Select.Option>
      ))}
    </Select>
  )
}

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
  }
  // ここに到達することは通常ないが 戻り値の推論型から undefined を消すため定義
  return <></>
}
