import { Input, InputProps, Select, SelectProps as DUSelectProps, Option } from 'react-daisyui'

// type ChoiceType = 'select' | 'checkbox' | 'radio'
// type SingleInputType = 'text' | 'textArea' //| 'range'

type FormPropsBase = { name: string }

type InputTextProps = FormPropsBase & { ft: 'text' }
type SelectProps = FormPropsBase & { ft: 'select' }

export type FormProps = InputTextProps | SelectProps

export type FormTag = FormProps['ft']

// export type FormSetType = { [P in FormTag]: (props: { ft: string }) => JSX.Element }
// type FormSetType = Record<FormTag, (props: FormProps) => JSX.Element>

//type HasFormTag<T> = keyof T extends FormTag ? T : never

const defaultInputTextForm: InputProps = { color: 'primary' }
const InputTextForm = (props: InputTextProps) => {
  const mergedProps = { ...defaultInputTextForm, ...props }

  return <Input {...mergedProps} />
}

const defaultSelectForm: Partial<DUSelectProps<'string'>> = { color: 'primary' }
const SelectForm = (props: SelectProps) => {
  const mergedProps = { ...defaultSelectForm, ...props }

  return (
    <Select {...mergedProps}>
      <Option value={'1'}>A</Option>
      <Option value={'2'}>A</Option>
    </Select>
  )
}

const formSet = { text: InputTextForm, select: SelectForm } as const

const createForm =
  <SET extends Record<FormTag, unknown>>(set: SET) =>
  (props: FormProps) => {
    switch (props.ft) {
      case 'text':
        return set['text']
      case 'select':
        return set['select']

      //網羅性のチェックのためのコード
      default:
        const forExhaustiveCheck: never = props
    }
  }

const Form = createForm(formSet)
