import { createForms, InputTextDef, SelectDef } from '../FormDef'

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
