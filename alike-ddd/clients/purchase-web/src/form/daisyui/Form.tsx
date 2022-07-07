/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Button, ButtonProps } from 'react-daisyui'
import { Controller, Path, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { FC, ReactNode, useMemo } from 'react'
import { FormDef, PickFcSetFromDefSet } from '../FormDef'
import { newInputTextForm } from './InputTextForm'
import { newSelectForm } from './SelectForm'
import { newRangeForm } from './RangeForm'
import { newRadioForm } from './RadioForm'

export const formFcSetByDaisyUI = {
  text: newInputTextForm,
  range: newRangeForm,
  select: newSelectForm,
  radio: newRadioForm,
} as const

// TODO 多分不可能だと思うが、本当は 右辺の型を Record<FormTag,(props: FormProps) => JSX.Element> のように 厳密にチェックしたいが方法がわからない
// const forTypeCheck: Record<FormTag, unknown> = formSet

export const newForm = (def: FormDef) => {

  switch (def.ft) {
    case 'text':
      return formFcSetByDaisyUI.text(def)
    case 'range':
      return formFcSetByDaisyUI.range(def)
    case 'select':
      return formFcSetByDaisyUI.select(def)
    case 'radio':
      return formFcSetByDaisyUI.radio(def)

    // return formSet['select'](def)

    default: {
      //網羅性のチェックのためのコード
      // eslint-disable-next-line no-unused-vars
      const forExhaustiveCheck: never = def
      // ここに到達することは通常ないが 戻り値の推論型から undefined を消すため定義
      return () => <></>
    }
  }
}

export const newForms = <T extends Record<string, FormDef>>(defs: T) => {
  const arr = Object.entries(defs).map(([key, def]) => [key, newForm(def)])
  //TODO 型チェックエラーのごまかしの解消
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.fromEntries(arr as any) as PickFcSetFromDefSet<T, typeof formFcSetByDaisyUI>
}

type FormNodeType = FC<{ children: ReactNode }>
type SubmitButtonType = FC<{ label?: string } & ButtonProps>

export const useFormDef = <DEF extends Record<string, FormDef>, T>(
  defs: DEF,
  hookFormProps: UseFormProps<T>,
  withSubmit: (data: T) => void
) => {
  const useFormReturn = useForm(hookFormProps)

  const Parts = useMemo(
    () => createFormPartsByReactHookForms(defs, useFormReturn, withSubmit),
    [useFormReturn, withSubmit, defs]
  )

  const Forms = useMemo(
    () => () =>
      (
        <Parts.Form>
          {/*  <form onSubmit={useFormReturn.handleSubmit((data) => console.log('form : data=', data))}> */}
          {Object.entries(Parts.Items).map(([key, Node]) => React.createElement(Node, { key }))}
          <Parts.Submit />
          {/* </form> */}
        </Parts.Form>
      ),
    [Parts]
  )

  return { Forms, Parts }
}

export const createFormPartsByReactHookForms = <DEF extends Record<string, FormDef>, SCHEMA>(
  defs: DEF,
  hookFormReturn: UseFormReturn<SCHEMA>,
  withSubmit: (data: SCHEMA) => void
) => {
  const FormNode: FormNodeType = (props) => (
    <form onSubmit={hookFormReturn.handleSubmit(withSubmit)}>{props.children}</form>
  )

  const Submit: SubmitButtonType = ({ label = '送信', ...props }) => (
    <Button color="primary" type="submit" {...props}>
      {label}
    </Button>
  )

  const tmpArray = Object.entries(defs).map(([key, def]) => {
    const RawForm = newForm(def)
    //TODO 型チェックエラーのごまかしの解消
    const Fc = (props: SCHEMA) => (
      <Controller
        name={key as Path<SCHEMA>}
        control={hookFormReturn.control}
        // defaultValue={hookFormProps?.defaultValues?[key as Path<T>]}
        render={({ field, formState }) => {
          const mergedProps = { ...props, ...field, error: (formState.errors as any)[key]?.message }
          // console.log('createFormPartsByReactHookForms : mergedProps', mergedProps)
          return RawForm(mergedProps as any)
        }}
      />
    )
    return [key, Fc]
  })

  const Items = Object.fromEntries(tmpArray as any) as PickFcSetFromDefSet<DEF, typeof formFcSetByDaisyUI>

  return { Form: FormNode, Submit, Items }
}
