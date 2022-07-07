/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input, InputProps } from 'react-daisyui'
import { InputTextProps } from '../Form'
import { InputTextDef } from '../FormDef'

const defaultInputTextForm: InputProps = { color: 'primary' }
export const newInputTextForm = (def: InputTextDef) => (props: InputTextProps & InputProps) => {
  const mergedProps = {
    ...defaultInputTextForm,
    color: props.error ? 'error' : defaultInputTextForm.color,
    'aria-label': def.label,
    // required: defaultDef.required,
    ...props,
  }

  // console.log('props=', props)

  return (
    <label className="label" htmlFor={def.name}>
      <span className="label-text">{def.label}</span>
      {/* <span className="label-text-alt">Alt label</span> */}
      <Input {...mergedProps} />
      {props.error && <span className="text-error">{props.error}</span>}
    </label>
  )
}
