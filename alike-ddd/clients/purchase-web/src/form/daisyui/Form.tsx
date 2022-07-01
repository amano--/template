/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactNode } from 'react'
import { FormDef, PickFcSetFromDefSet } from '../FormDef'
import { InputTextForm } from './InputTextForm'
import { SelectForm } from './SelectForm'
import { PROPERTY_TYPES } from '@babel/types'
import { Button } from 'react-daisyui'

export const formFcSetByDaisyUI = { text: InputTextForm, select: SelectForm, radio: SelectForm } as const

// TODO 多分不可能だと思うが、本当は 右辺の型を Record<FormTag,(props: FormProps) => JSX.Element> のように 厳密にチェックしたいが方法がわからない
// const forTypeCheck: Record<FormTag, unknown> = formSet

export const Form = (def: FormDef) => {
  switch (def.ft) {
    case 'text':
      return formFcSetByDaisyUI.text(def)
    case 'select':
      return formFcSetByDaisyUI.select(def)
    case 'radio':
      return () => <></>

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

export const createForms = <T extends Record<string, FormDef>>(defs: T) => {
  const arr = Object.entries(defs).map(([key, def]) => [key, Form(def)])
  //TODO 型チェックエラーのごまかしの解消
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.fromEntries(arr as any) as PickFcSetFromDefSet<T, typeof formFcSetByDaisyUI>
}

type FormNodeType = FC<{ children: ReactNode }>
type SubmitButtonType = FC<{ label?: string }>
export const useFormDef = <DEF extends Record<string, FormDef>, T>(
  defs: DEF,
  hookFormProps: UseFormProps<T>,
  withSubmit: (data: T) => void
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(hookFormProps)

  const FormNode: FormNodeType = (props) => <form onSubmit={handleSubmit(withSubmit)}>{props.children}</form>

  const Submit: SubmitButtonType = ({ label = '送信' }) => (
    <Button color="primary" type="submit">
      {label}
    </Button>
  )

  //TODO 型チェックエラーのごまかしの解消
  let arr = Object.entries(defs).map(([key, def]) => {
    const Component = (p: any) => {
      const mergedProps = { def, ...register(key as any), error: (errors as any)[key]?.message, ...p }
      return Form(def)(mergedProps)
    }
    return [key, Component]
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const Items = Object.fromEntries(arr as any) as PickFcSetFromDefSet<DEF, typeof formFcSetByDaisyUI>

  const ComposedForm = () => (
    <FormNode>
      {Object.values(Items)}
      <Submit />
    </FormNode>
  )

  return { Form: ComposedForm, FormNode, Submit, Items }
}

export const useMyForm = <T,>(
  FormItems: Record<keyof T, (props: any) => JSX.Element>,
  hookFormProps: UseFormProps<T>,
  withSubmit: (data: T) => void
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(hookFormProps)

  const FormNode: FormNodeType = (props) => <form onSubmit={handleSubmit(withSubmit)}>{props.children}</form>

  const Submit: SubmitButtonType = ({ label = '送信' }) => (
    <Button color="primary" type="submit">
      {label}
    </Button>
  )

  const Items = Object.entries(FormItems).map(([key, FormItem]) => {
    //TODO 型チェックエラーのごまかしの解消
    const props = { ...register(key as any), error: (errors as any)[key]?.message }
    return <FormItem {...props} />
  })

  const ComposedForm = () => (
    <FormNode>
      {Object.values(Items)}
      <Submit />
    </FormNode>
  )

  return { Form: ComposedForm, FormNode, Submit, Items }
}
