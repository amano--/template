/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import {
  newForm as newFormByDaisyui,
  newForms as newFormsByDaisyui,
  useFormDef as useFormDefByDaisyui,
} from './daisyui'
import { FormTag } from './Form'

export type FormDefBase = { name: string; label: string; required: boolean }
export type InputTextDef = FormDefBase & { ft: 'text' }
export type RangeDef = FormDefBase & { ft: 'range'; min: number; max: number; step: number }

export type ChoiceItemDef = { name: string; label: string }
export type ChoiceDef<T extends Record<string, ChoiceItemDef>> = FormDefBase & {
  items: T
}

// TODO any で適当に対応したので改善 ぶっちゃけこの型引数いらない気がしてきた
export type SelectDef<T extends Record<string, ChoiceItemDef> = any> = ChoiceDef<T> & { ft: 'select' }
export type RadioDef<T extends Record<string, ChoiceItemDef> = any> = ChoiceDef<T> & { ft: 'radio' }

export type FormDef = InputTextDef | RangeDef | SelectDef | RadioDef

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

export const newForm = defaultComponentLibraryTag == 'daisyui' ? newFormByDaisyui : newFormByDaisyui

const defineNewForms = (componentLibraryTag: ComponentLibraryTag = 'daisyui') => {
  switch (componentLibraryTag) {
    case 'daisyui':
      return newFormsByDaisyui

    default: {
      //網羅性のチェックのためのコード
      // eslint-disable-next-line no-unused-vars
      const forExhaustiveCheck: never = componentLibraryTag
      // ここに到達することは通常ないが 戻り値の推論型から undefined を消すため定義
      return newFormsByDaisyui
    }
  }
}

export const newForms = defineNewForms()

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
