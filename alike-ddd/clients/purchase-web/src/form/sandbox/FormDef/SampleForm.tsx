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
  const { Form } = useFormDef(
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
    <Form.Form>
      <Form.Items.name color="warning" className="rounded-r-full" />
      <Form.Items.gender color="info" />
      <Form.Items.profession color="secondary" />
      <Form.Items.volume color="secondary" />

      <div className="flex-row justify-center">
        <Form.Submit label="個人情報入力画面へ" />
      </div>
    </Form.Form>
  )
}
