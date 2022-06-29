import { formComponentSetByDaisyUI } from './daisyui'
import { createForms, InputTextDef, PickFcSetFromDefSet, SelectDef } from './FormDef'

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
const forms = { name, gender } as const

type Set = PickFcSetFromDefSet<typeof forms, typeof formComponentSetByDaisyUI>

const Forms: Set = createForms(forms)

const Name = Forms.name
