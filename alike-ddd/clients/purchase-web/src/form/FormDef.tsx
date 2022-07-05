/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
export type FormDefBase = { name: string; label: string; required: boolean }
export type InputTextDef = FormDefBase & { ft: 'text' }

import {
  Form as FormByDaisyui,
  createForms as createFormsByDaisyui,
  useFormDef as useFormDefByDaisyui,
} from './daisyui'
import { FormTag } from './Form'

export type ChoiceItemDef = { name: string; label: string }
export type ChoiceDef<T extends Record<string, ChoiceItemDef>> = FormDefBase & {
  items: T
}

export type SelectDef<T extends Record<string, ChoiceItemDef>> = ChoiceDef<T> & { ft: 'select' }
export type RadioDef<T extends Record<string, ChoiceItemDef>> = ChoiceDef<T> & { ft: 'radio' }

// TODO any で適当に対応したので改善
export type FormDef = InputTextDef | SelectDef<any> | RadioDef<any>

export type PickFcTypeByDefFromFormComponentSet<DEF extends FormDef, CS> = CS extends Record<DEF['ft'], infer FC>
  ? FC extends (def: any) => (props: infer IN) => JSX.Element
    ? (props: Partial<IN>) => JSX.Element
    : never
  : never

export type PickFcSetFromDefSet<
  TFormDefSet extends Record<keyof TFormDefSet, FormDef>,
  TFormFcSet extends Record<FormTag, unknown>
> = { [K in keyof TFormDefSet]: PickFcTypeByDefFromFormComponentSet<TFormDefSet[K], TFormFcSet> }

export type ComponentLibraryTag = 'daisyui'

const defaultComponentLibraryTag: ComponentLibraryTag = 'daisyui'

export const Form = defaultComponentLibraryTag == 'daisyui' ? FormByDaisyui : FormByDaisyui

const defineCreateForms = (componentLibraryTag: ComponentLibraryTag = 'daisyui') => {
  switch (componentLibraryTag) {
    case 'daisyui':
      return createFormsByDaisyui

    default: {
      //網羅性のチェックのためのコード
      // eslint-disable-next-line no-unused-vars
      const forExhaustiveCheck: never = componentLibraryTag
      // ここに到達することは通常ないが 戻り値の推論型から undefined を消すため定義
      return createFormsByDaisyui
    }
  }
}

export const createForms = defineCreateForms()

const defineUseFormDef = (componentLibraryTag: ComponentLibraryTag = 'daisyui') => {
  switch (componentLibraryTag) {
    case 'daisyui':
      return useFormDefByDaisyui

    default: {
      //網羅性のチェックのためのコード
      // eslint-disable-next-line no-unused-vars
      const forExhaustiveCheck: never = componentLibraryTag
      // ここに到達することは通常ないが 戻り値の推論型から undefined を消すため定義
      return useFormDefByDaisyui
    }
  }
}

export const useFormDef = defineUseFormDef()
