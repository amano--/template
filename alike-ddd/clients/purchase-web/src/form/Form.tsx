//TODO label の多言語対応
export type FormBase = { name: string; label: string }

export type FormDefBase = FormBase & { required: boolean }
export type InputTextDef = FormDefBase & { ft: 'text' }

//TODO label の多言語対応
export type FormPropsBase = { name: string; label: string }

export type InputTextProps = FormPropsBase & { ft: 'text'; def: InputTextDef }

export type SingleInputProps = InputTextProps

export type ChoiceItemDef = { name: string; label: string }

//TODO items の多言語対応
export type ChoicePropsBase = FormPropsBase & { itemDefs: Record<string, ChoiceItemDef> }
export type SelectProps = ChoicePropsBase & { ft: 'select' }
export type RadioProps = ChoicePropsBase & { ft: 'radio' }

export type ChoiceProps = SelectProps | RadioProps

export type FormProps = SingleInputProps | ChoiceProps

export type FormTag = FormProps['ft']

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
