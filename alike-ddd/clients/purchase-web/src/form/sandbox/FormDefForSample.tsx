import { createForms, InputTextDef, SelectDef } from '../FormDef'
import { useFormDef } from '../daisyui/Form'

const name: InputTextDef = {
  ft: 'text',
  name: 'name',
  label: '名前',
  required: true,
}

const genderItems = { male: { name: 'male', label: '男性' }, female: { name: 'female', label: '女性' } } as const

const gender: SelectDef<typeof genderItems> = {
  ft: 'select',
  name: 'gender',
  label: '性別',
  required: false,
  items: genderItems,
}

export const formDefsForSample = { name, gender } as const

const Sample = createForms(formDefsForSample)
export const FormDefForSampleForms = (props: { hoge: string }) => (
  <>
    <Sample.name></Sample.name>
    <Sample.gender></Sample.gender>
  </>
)

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

export const schema = z.object({
  name: z.string().max(5),
  gender: z.string().max(5),
})

export type Schema = z.infer<typeof schema>

export const FormDefForSampleForms2 = (props: Schema) => {
  const { Forms, Parts } = useFormDef(
    formDefsForSample,
    {
      defaultValues: props,
      resolver: zodResolver(schema),
      // shouldFocusError: false,
    },
    (data) => {
      console.log('form submitted: data=', data)
    }
  )

  // Parts.Items.name
  //{/* <Forms.Items.name ></Forms.Items.name> */}
  return <Forms></Forms>
}

export const FormDefForSampleForms3 = (props: Schema) => {
  const { Forms, Parts } = useFormDef(
    formDefsForSample,
    {
      defaultValues: props,
      resolver: zodResolver(schema),
      // shouldFocusError: false,
    },
    (data) => {
      console.log('form submitted: data=', data)
    }
  )

  // Parts.Items.name
  //{/* <Forms.Items.name ></Forms.Items.name> */}
  return <Forms></Forms>
}
