import { createForms, InputTextDef, SelectDef } from '../FormDef'
import { useFormDef, useMyForm } from '../daisyui/Form'

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

export const schema = z.object({
  name: z.string().max(5),
  gender: z.string().max(5),
})

export type Schema = z.infer<typeof schema>

export const FormDefForSampleForms2 = (props: Schema) => {
  const { Form } = useMyForm(
    Sample,
    {
      defaultValues: props,
      resolver: zodResolver(schema),
    },
    (data) => {
      console.log(data)
    }
  )

  return <Form></Form>
}
