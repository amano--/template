/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputProps } from 'react-daisyui'
import { InputTextProps } from '../Form'
import { InputTextDef } from '../FormDef'

const defaultInputTextForm: InputProps = { color: 'primary' }
export const InputTextForm = (def: InputTextDef) => (props: InputTextProps & InputProps) => {
  const mergedProps = {
    ...defaultInputTextForm,
    'aria-label': def.label,
    // required: defaultDef.required,
    ...props,
  }

  return (
    <label className="label" htmlFor={def.name}>
      <span className="label-text">{def.label}</span>
      {/* <span className="label-text-alt">Alt label</span> */}
      <Input {...mergedProps} />
    </label>
  )
}
