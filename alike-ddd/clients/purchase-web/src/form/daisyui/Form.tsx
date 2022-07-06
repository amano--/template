/* eslint-disable react/function-component-definition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Path, useForm, UseFormProps, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FC, ReactNode, useMemo } from 'react'
import { FormDef, PickFcSetFromDefSet } from '../FormDef'
import { InputTextForm } from './InputTextForm'
import { SelectForm } from './SelectForm'
import { PROPERTY_TYPES } from '@babel/types'
import { Button, Input } from 'react-daisyui'
import React from 'react'

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
  const useFormReturn = useForm(hookFormProps)

  const Parts = useMemo(
    () => createFormPartsByReactHookForms(defs, useFormReturn, withSubmit),
    [useFormReturn, withSubmit, defs]
  )
  const Forms = useMemo(
    () => () =>
      (
        <Parts.Form>
          {/* {React.Children} */}
          {Object.values(Parts.Items).map((Node) => React.createElement(Node))}
          <Parts.Submit />
        </Parts.Form>
      ),
    [Parts]
  )

  return { Forms, Parts }
}

// export const useFormByHookForms = <T,>(
//   FormItems: Record<keyof T, (props: any) => JSX.Element>,
//   hookFormProps: UseFormProps<T>,
//   withSubmit: (data: T) => void
// ) => {
//   const {
//     control,
//     // register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm(hookFormProps)

//   const FormNode: FormNodeType = (props) => <form onSubmit={handleSubmit(withSubmit)}>{props.children}</form>

//   const Submit: SubmitButtonType = ({ label = '送信' }) => (
//     <Button color="primary" type="submit">
//       {label}
//     </Button>
//   )

//   const Items = Object.entries(FormItems).map(([key, FormItem]) => {
//     //TODO 型チェックエラーのごまかしの解消
//     const props = { error: (errors as any)[key]?.message }
//     return (
//       <Controller
//         name={key as Path<T>}
//         control={control}
//         // defaultValue={hookFormProps?.defaultValues?[key as Path<T>]}
//         render={(
//           { field } //<input {...(field as any)} />}
//         ) => FormItem({ ...props, ...field })}
//       />
//     )
//   })

//   const ComposedForm = () => (
//     <FormNode>
//       {Object.values(Items)}
//       <Submit />
//     </FormNode>
//   )

//   return { Form: ComposedForm, FormNode, Submit, Items }
// }

// export const createFormsByReactHookForms = <DEF extends Record<string, FormDef>, SCHEMA>(
//   defs: DEF,
//   hookFormProps: UseFormProps<SCHEMA>,
//   withSubmit: (data: SCHEMA) => void
// ) => {
//   ;(props: SCHEMA) => {
//     const {
//       control,
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm(hookFormProps)

//     const FormNode: FormNodeType = (props) => <form onSubmit={handleSubmit(withSubmit)}>{props.children}</form>

//     const Submit: SubmitButtonType = ({ label = '送信' }) => (
//       <Button color="primary" type="submit">
//         {label}
//       </Button>
//     )

//     const Items = Object.entries(FormItems).map(([key, FormItem]) => {
//       //TODO 型チェックエラーのごまかしの解消
//       const props = { error: (errors as any)[key]?.message }
//       return (
//         <Controller
//           name={key as Path<T>}
//           control={control}
//           // defaultValue={hookFormProps?.defaultValues?[key as Path<T>]}
//           render={(
//             { field } //<input {...(field as any)} />}
//           ) => FormItem({ ...props, ...field })}
//         />
//       )
//     })

//     const ComposedForm = () => (
//       <FormNode>
//         {Object.values(Items)}
//         <Submit />
//       </FormNode>
//     )

//     return { Form: ComposedForm, FormNode, Submit, Items }
//   }
// }

export const createFormPartsByReactHookForms = <DEF extends Record<string, FormDef>, SCHEMA>(
  defs: DEF,
  hookFormReturn: UseFormReturn<SCHEMA>,
  withSubmit: (data: SCHEMA) => void
) => {
  const FormNode: FormNodeType = (props) => (
    <form onSubmit={hookFormReturn.handleSubmit(withSubmit)}>{props.children}</form>
  )

  const Submit: SubmitButtonType = ({ label = '送信' }) => (
    <Button color="primary" type="submit">
      {label}
    </Button>
  )

  const tmpArray = Object.entries(defs).map(([key, def]) => {
    const RawForm = Form(def)
    //TODO 型チェックエラーのごまかしの解消
    const Fc = (props: SCHEMA) => (
      <Controller
        name={key as Path<SCHEMA>}
        control={hookFormReturn.control}
        // defaultValue={hookFormProps?.defaultValues?[key as Path<T>]}
        render={({ field, formState }) => {
          const mergedProps = { ...props, ...field, error: (formState.errors as any)[key]?.message }
          return RawForm(mergedProps as any)
        }}
      />
    )
    return [key, Fc]
  })

  const Items = Object.fromEntries(tmpArray as any) as PickFcSetFromDefSet<DEF, typeof formFcSetByDaisyUI>

  return { Form: FormNode, Submit, Items }
}
