import { newForms, InputTextDef, SelectDef, RangeDef, ToFormProps, ToFormsProps, RadioDef } from '../../FormDef'
import { useFormDef } from '../../daisyui/Form'

const name: InputTextDef = {
  ft: 'text',
  name: 'name',
  label: '名前',
  required: true,
}

const genderItems = {
  male: { name: 'male', label: '男性' },
  female: { name: 'female', label: '女性' },
  other: { name: 'other', label: 'その他' },
} as const

const genderItemKeys = Object.keys(genderItems) as unknown as readonly [string, ...string[]]

const gender: SelectDef<typeof genderItems> = {
  ft: 'select',
  name: 'gender',
  label: '性別',
  required: false,
  items: genderItems,
}

// 職業
const professionItems = {
  employee: { name: 'employee', label: '会社員' },
  director: { name: 'director', label: '会社役員' },
  other: { name: 'other', label: 'その他' },
} as const

const profession: RadioDef<typeof professionItems> = {
  ft: 'radio',
  name: 'profession',
  label: '職業',
  required: true,
  items: professionItems,
} as const

const volume: RangeDef = {
  ft: 'range',
  name: 'volume',
  label: 'ボリューム',
  required: true,

  min: 0,
  max: 100,
  step: 25,
}

export const formDefsForSample = { name, gender, profession, volume } as const

const Sample = newForms(formDefsForSample)

type Props = ToFormsProps<typeof formDefsForSample>
export const FormDefForSampleForms = (props: { hoge: string }) => (
  <>
    <Sample.name color="secondary" className="rounded-r-full"></Sample.name>
    <Sample.gender color="accent"></Sample.gender>
    <Sample.profession color="secondary"></Sample.profession>
    <Sample.volume color="accent"></Sample.volume>
  </>
)

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const schema = z.object({
  name: z.string().max(5),
  gender: z.enum(genderItemKeys), //string().max(5),
  profession: z.string(),
  volume: z
    .number()
    .min(0)
    .max(100)
    .or(
      z
        .string()
        .refine((v) => {
          return !isNaN(Number(v))
        }, 'error message')
        .transform(Number)
    ),
})

export type Schema = z.infer<typeof schema>

export const FormDefForSampleForms2 = (props: Props) => {
  const { Forms, Parts } = useFormDef(
    formDefsForSample,
    {
      defaultValues: props,
      resolver: zodResolver(schema),
      // shouldFocusError: false,
    },
    (data) => {
      console.log('form submitted: data=', data)
      // window?.alert(`form submitted: data=${JSON.stringify(data)}`)
    }
  )

  // Parts.Items.name
  //{/* <Forms.Items.name ></Forms.Items.name> */}
  return <Forms></Forms>
}

export const SetFormPerItem = (props: Props) => {
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
  return (
    <Parts.Form>
      <Parts.Items.name color="secondary" className="rounded-r-full" />
      <Parts.Items.gender color="accent" />
      <Parts.Items.profession color="secondary" />
      <Parts.Items.volume color="primary" />

      <div className="flex-row justify-center">
        <Parts.Submit label="個人情報入力画面へ" />
      </div>

      {/* <div className="flex-row justify-center">
        <span>lang = {document.documentElement.lang}</span>
      </div> */}
    </Parts.Form>
  )
}
