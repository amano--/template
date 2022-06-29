export type FormDefBase = { name: string; label: string; required: boolean }
export type InputTextDef = FormDefBase & { ft: 'text' }

import { Form as DaisyuiForm } from './daisyui'
export type ComponentLibraryTag = 'daisyui'

// //TODO label の多言語対応
// export type FormPropsBase = { name: string; label: string }

// export type InputTextProps = FormPropsBase & { ft: 'text' }

// export type SingleInputProps = InputTextProps

export type ChoiceItemDef = { name: string; label: string }
export type ChoiceDef<T extends Record<string, ChoiceItemDef>> = FormDefBase & {
  items: T
}

export type SelectDef<T extends Record<string, ChoiceItemDef>> = ChoiceDef<T> & { ft: 'select' }
export type RadioDef<T extends Record<string, ChoiceItemDef>> = ChoiceDef<T> & { ft: 'radio' }

export type FormDef = InputTextDef | SelectDef<any> | RadioDef<any>
// export type FormDef = InputTextDef | SelectDef<any> | RadioDef

// export type ChoiceItemDef = { name: string; label: string }

// export type ChoiceDef = FormDefBase & {
//   items: Record<string, ChoiceItemDef>
// }

// export type SelectDef = ChoiceDef & { ft: 'select' }
// export type RadioDef = ChoiceDef & { ft: 'radio' }

// export type FormDef = InputTextDef | SelectDef | RadioDef

const name: InputTextDef = {
  ft: 'text',
  name: 'name',
  label: '名前',
  required: true,
}

const genderItems = { male: { name: 'male', label: '男性' }, female: { name: 'female', label: '女性' } } as const

const gender: SelectDef<typeof genderItems> = {
  ft: 'select',
  name: 'gender',
  label: '性別',
  required: false,
  items: genderItems,
}

const form: Record<string, FormDef> = { name, gender }

const defaultComponentLibraryTag = 'daisyui'
export const Form = defaultComponentLibraryTag == 'daisyui' ? DaisyuiForm : DaisyuiForm

const createForm = (def: FormDef, componentLibraryTag: ComponentLibraryTag = 'daisyui') => {
  switch (componentLibraryTag) {
    case 'daisyui':
      return DaisyuiForm(def)
    //網羅性のチェックのためのコード
    default:
      const forExhaustiveCheck: never = componentLibraryTag
  }
}

export const createForms = <T extends Record<string, FormDef>>(
  defs: T,
  componentLibraryTag: ComponentLibraryTag = 'daisyui'
) => {
  const arr = Object.entries(defs).map(([key, def]) => [key, createForm(def, componentLibraryTag)])

  return Object.fromEntries(arr) //as Record<keyof T,>
  // defs.
  // switch (componentLibraryTag) {
  //   case 'daisyui':
  //     return DaisyuiForm

  //   //網羅性のチェックのためのコード
  //   default:
  //     const forExhaustiveCheck: never = componentLibraryTag
  // }
}

// export type ChoiceItemDef<K, V> = { name: K; label: V }

// export type ChoiceDef<O extends Record<string, unknown>> = O extends Record<infer K, infer V>
//   ? FormDefBase & {
//       items: Record<K, ChoiceItemDef<K, V>>
//     }
//   : never
// const e = { foo: 'フー', bar: 'バー' }
// type A = ChoiceDef<typeof e>

// //TODO items の多言語対応
// export type ChoicePropsBase = FormPropsBase & { itemDefs: Record<string, ChoiceItemDef> }
// export type SelectProps = ChoicePropsBase & { ft: 'select' }

// export type ChoiceProps = SelectProps

// export type FormProps = SingleInputProps | ChoiceProps

// export type FormTag = FormProps['ft']

// export type FormSetType = { [P in FormTag]: (props: { ft: string }) => JSX.Element }
// export type FormSetType = Record<FormTag, (props: FormProps) => JSX.Element>

//type HasFormTag<T> = keyof T extends FormTag ? T : never

// const createForm =
//   <SET extends Record<FormTag, unknown>>(set: SET) =>
//   (props: FormProps) => {
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
