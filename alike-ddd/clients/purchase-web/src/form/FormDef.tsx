export type FormDefBase = { name: string; label: string; required: boolean }
export type InputTextDef = FormDefBase & { ft: 'text' }

import { FC } from 'react'
import { Form as FormByDaisyui, createForms as createFormsByDaisyui, formComponentSetByDaisyUI } from './daisyui'
import { FormTag } from './Form'
import { formDefs } from './formDefSet'
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

const defaultComponentLibraryTag = 'daisyui'

export const Form = defaultComponentLibraryTag == 'daisyui' ? FormByDaisyui : FormByDaisyui

// type Name = typeof forms.name
// type PickFcFromDef<DEF extends FormDef, FC> = FC extends (props: infer IN) => JSX.Element
//   ? (props: Partial<IN>) => JSX.Element
//   : never
// type a = PickFcFromDef<Name, (props: { hoge: string }) => JSX.Element>

type Name = typeof formDefs.name
type PickFcTypeByDefFromFormComponentSet<DEF extends FormDef, CS> = CS extends Record<DEF['ft'], infer FC>
  ? FC extends (def: any) => (props: infer IN) => JSX.Element
    ? (props: Partial<IN>) => JSX.Element
    : never
  : never
// type a = PickFcFromDef<Name, (props: { hoge: string }) => JSX.Element>
type a = PickFcTypeByDefFromFormComponentSet<Name, typeof formComponentSetByDaisyUI>

export type PickFcSetFromDefSet<
  SET extends Record<keyof SET, FormDef>,
  COMPONENT_SET extends Record<FormTag, unknown>
> = SET extends Record<keyof SET, infer DEF>
  ? DEF extends FormDef
    ? { [K in keyof SET]: PickFcTypeByDefFromFormComponentSet<DEF, COMPONENT_SET> }
    : never
  : never

// export type PickFcSetFromDefSet<
//   FORM_DEF_SET extends Record<string, FormDef>,
//   COMPONENT_SET extends Record<FormTag, (def: any) => unknown>
// > = { [K in keyof FORM_DEF_SET]: ReturnType<COMPONENT_SET['text']> }

const createCreateForms = (componentLibraryTag: ComponentLibraryTag = 'daisyui') => {
  switch (componentLibraryTag) {
    case 'daisyui':
      return createFormsByDaisyui
    //網羅性のチェックのためのコード
    default:
      const forExhaustiveCheck: never = componentLibraryTag
      return createFormsByDaisyui
  }
}

export const createForms = createCreateForms()

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
