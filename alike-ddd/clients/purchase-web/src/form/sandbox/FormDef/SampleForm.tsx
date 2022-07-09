import { newForms, InputTextDef, SelectDef, RangeDef, ToFormProps, ToFormsProps, RadioDef } from '../../FormDef'
import { useFormDef } from '../../daisyui/Form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SampleFormDef, SampleFormProps, SampleFormSchema } from './SampleDef'

const Sample = newForms(SampleFormDef)
// const genderItemKeys = Object.keys(SampleFormDef.gender.items) as unknown as readonly [string, ...string[]]

export const OnlyPresentationalComponent = (props: { hoge: string }) => (
  <>
    <Sample.name color="secondary" className="rounded-r-full"></Sample.name>
    <Sample.gender color="accent"></Sample.gender>
    <Sample.profession color="secondary"></Sample.profession>
    <Sample.volume color="accent"></Sample.volume>
  </>
)

export const DefaultForms = (props: SampleFormProps) => {
  const { RootForms } = useFormDef(
    SampleFormDef,
    {
      defaultValues: props,
      resolver: zodResolver(SampleFormSchema),
      // shouldFocusError: false,
    },
    (data) => {
      console.log('form submitted: data=', data)
      // window?.alert(`form submitted: data=${JSON.stringify(data)}`)
    }
  )

  return <RootForms />
}

export const CustomFormItems = (props: SampleFormProps) => {
  const { Forms } = useFormDef(
    SampleFormDef,
    {
      defaultValues: props,
      resolver: zodResolver(SampleFormSchema),
      // shouldFocusError: false,
    },
    (data) => {
      console.log('form submitted: data=', data)
      // window?.alert(`form submitted: data=${JSON.stringify(data)}`)
    }
  )

  return (
    <Forms.Form>
      <Forms.Items.name color="warning" className="rounded-r-full" />
      <Forms.Items.gender color="info" />
      <Forms.Items.profession color="secondary" />
      <Forms.Items.volume color="secondary" />

      <div className="flex-row justify-center">
        <Forms.Submit label="個人情報入力画面へ" />
      </div>
    </Forms.Form>
  )
}
