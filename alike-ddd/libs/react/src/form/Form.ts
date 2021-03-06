import { InputTextDef, RangeDef } from './FormDef'

//TODO label の多言語対応
export type FormBase = { name: string; label: string }

// export type FormDefBase = FormBase & { required: boolean }
// export type InputTextDef = FormDefBase & { ft: 'text' }

//TODO label の多言語対応
export type FormPropsBase = { name: string; label: string; error?: string }

export type InputTextProps = FormPropsBase & { ft: 'text'; def: InputTextDef }
export type RangeProps = FormPropsBase & { ft: 'range'; def: RangeDef }

export type SingleInputProps = InputTextProps | RangeProps

//TODO items の多言語対応
export type ChoicePropsBase = FormPropsBase
export type SelectProps = ChoicePropsBase & { ft: 'select' }
export type RadioProps = ChoicePropsBase & { ft: 'radio' }

export type ChoiceProps = SelectProps | RadioProps

export type FormProps = SingleInputProps | ChoiceProps

export type FormTag = FormProps['ft']
