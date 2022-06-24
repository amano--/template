export type FormDefBase = { name: string; label: string; required: boolean }
export type InputTextDef = FormDefBase & { ft: 'text' }

// //TODO label の多言語対応
// export type FormPropsBase = { name: string; label: string }

// export type InputTextProps = FormPropsBase & { ft: 'text' }

// export type SingleInputProps = InputTextProps

export type ChoiceItemDef = { name: string; label: string }

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
