/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Range, RangeProps as DUIRangeProps } from 'react-daisyui'
import { RangeProps } from '../Form'
import { RangeDef } from '../FormDef'

//TODO このFormは 不正な値が手入力できないため 入力エラーになることは基本ないと思うが、対応を熟慮する必要があるかも
export type RangeFormProps = RangeProps & DUIRangeProps

const defaultProps: DUIRangeProps = { color: 'primary' }

export const newRangeForm = (def: RangeDef) => (props: RangeFormProps) => {
  // TODO nested object 対応
  const id = props.name ?? def.name

  const mergedProps: RangeFormProps = {
    ...defaultProps,
    // TODO range に error がない問題の対応
    color: props.error ? 'accent' : defaultProps.color,
    'aria-label': def.label,
    // required: defaultDef.required,
    // TODO 不要なものが展開される問題の対応
    ...def,
    // TODO def とか余計なものがDOMについちゃう問題の対応
    ...props,
    // key: id,
    id, // color: props.error ? 'error' : defaultRangeForm.color,
    name: id,
    // min: props.min ?? def.min,
  }
  // console.log('def.min', def.min)
  return (
    <>
      <label className="label" htmlFor={id}>
        <span className="label-text">{def.label}</span>
        {/* <span className="label-text-alt">Alt label</span> */}

        {/*
      {props.error && <span className="text-error">{props.error}</span>}
      */}
      </label>
      <Range {...mergedProps} />
      {props.error && <span className="text-error">{props.error}</span>}
    </>
  )
}
