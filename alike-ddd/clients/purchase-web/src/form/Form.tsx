import { InputTextDef } from './FormDef'
import { useFormByHookForms } from './daisyui/Form'

//TODO label の多言語対応
export type FormBase = { name: string; label: string }

// export type FormDefBase = FormBase & { required: boolean }
// export type InputTextDef = FormDefBase & { ft: 'text' }

//TODO label の多言語対応
export type FormPropsBase = { name: string; label: string; error?: string }

export type InputTextProps = FormPropsBase & { ft: 'text'; def: InputTextDef }

export type SingleInputProps = InputTextProps

//TODO items の多言語対応
export type ChoicePropsBase = FormPropsBase
export type SelectProps = ChoicePropsBase & { ft: 'select' }
export type RadioProps = ChoicePropsBase & { ft: 'radio' }

export type ChoiceProps = SelectProps | RadioProps

export type FormProps = SingleInputProps | ChoiceProps

export type FormTag = FormProps['ft']

const useFormDefaultFwId = 'reactHookForms'
export const useForm = useFormDefaultFwId === 'reactHookForms' ? useFormByHookForms : useFormByHookForms
