export type FormDefBase = { name: string; label: string; required: boolean }
export type InputTextDef = FormDefBase & { ft: 'text' }

// //TODO label の多言語対応
// export type FormPropsBase = { name: string; label: string }

// export type InputTextProps = FormPropsBase & { ft: 'text' }

// export type SingleInputProps = InputTextProps

export type ChoiceItemDef = { name: string; label: string }

export type ChoiceDef<T extends Record<string, ChoiceItemDef> = any> = FormDefBase & {
  items: T
}

export type SelectDef<T extends Record<string, ChoiceItemDef> = any> = ChoiceDef<T> & { ft: 'select' }
export type RadioDef<T extends Record<string, ChoiceItemDef> = any> = ChoiceDef<T> & { ft: 'radio' }

export type FormDef<T extends Record<string, ChoiceItemDef> = any> = InputTextDef | SelectDef<T> | RadioDef<T>
// export type FormDef = InputTextDef | SelectDef<any> | RadioDef

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

const a: [FormDef] = [name, gender]

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
