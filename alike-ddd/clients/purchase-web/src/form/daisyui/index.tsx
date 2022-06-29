/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputProps, Select, SelectProps as DUSelectProps } from 'react-daisyui'
import { InputTextProps, SelectProps } from '../Form'
import { ChoiceItemDef, FormDef, InputTextDef, PickFcSetFromDefSet, SelectDef } from '../FormDef'

const defaultInputTextForm: InputProps = { color: 'primary' }
export const InputTextForm = (defaultDef: InputTextDef) => (props: InputTextProps & InputProps) => {
  const mergedProps = { ...defaultInputTextForm, ...defaultDef, ...props }

  return <Input {...mergedProps} />
}

type PartialDUSelectProps = Partial<DUSelectProps<'string'>>
const defaultSelectForm: PartialDUSelectProps = { color: 'primary' }

export const SelectForm =
  <T extends Record<string, ChoiceItemDef>>(def: SelectDef<T>) =>
  (props: SelectProps & PartialDUSelectProps) => {
    const mergedProps = { ...defaultSelectForm, ...props }

    return (
      <Select {...mergedProps}>
        {Object.values(def.items).map((itemDef) => (
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

const formFcSetByDaisyUI = { text: InputTextForm, select: SelectForm, radio: SelectForm } as const

// TODO 多分不可能だと思うが、本当は 右辺の型を Record<FormTag,(props: FormProps) => JSX.Element> のように 厳密にチェックしたいが方法がわからない
// const forTypeCheck: Record<FormTag, unknown> = formSet

export const Form = (def: FormDef) => {
  switch (def.ft) {
    case 'text':
      return formFcSetByDaisyUI.text(def)
    case 'select':
      return formFcSetByDaisyUI.select(def)
    case 'radio':
      return () => <></>

    // return formSet['select'](def)

    default: {
      //網羅性のチェックのためのコード
      // eslint-disable-next-line no-unused-vars
      const forExhaustiveCheck: never = def
      // ここに到達することは通常ないが 戻り値の推論型から undefined を消すため定義
      return () => <></>
    }
  }
}

export const createForms = <T extends Record<string, FormDef>>(defs: T) => {
  const arr = Object.entries(defs).map(([key, def]) => [key, Form(def)])
  //TODO 型チェックエラーのごまかしの解消
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.fromEntries(arr as any) as PickFcSetFromDefSet<T, typeof formFcSetByDaisyUI>
}

// type Name = typeof formDefs.name
// type A = PickFcTypeByDefFromFormComponentSet<Name, typeof formFcSetByDaisyUI>
// type B = PickFcSetFromDefSet<typeof formDefs, typeof formFcSetByDaisyUI>
