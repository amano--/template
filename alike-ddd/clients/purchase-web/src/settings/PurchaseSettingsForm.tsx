// import { , InputTextDef, SelectDef, RangeDef, ToFormProps, ToFormsProps, RadioDef } from '../../FormDef'
import { useFormDef, newForms } from '@alike-ddd/react-libs'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { purchaseSettingsDef, PurchaseSettingsFormsProps, PurchaseSettingsFormSchema } from './PurchaseSettingsDef'

const PC = newForms(purchaseSettingsDef)

export const OnlyPresentationalComponent = (props: { hoge: string }) => (
  <>
    <PC.handleName color="secondary" className="rounded-r-full"></PC.handleName>
    {/* <PC.gender color="accent"></PC.gender>
    <PC.profession color="secondary"></PC.profession>
    <PC.volume color="accent"></PC.volume> */}
  </>
)

const validated = (data: PurchaseSettingsFormsProps) => {
  console.log('form submitted: data=', data)
  // window?.alert(`form submitted: data=${JSON.stringify(data)}`)
}

export const PurchaseSettingsForm = (props: PurchaseSettingsFormsProps) => {
  const { RootForms } = useFormDef(
    purchaseSettingsDef,
    {
      defaultValues: props,
      resolver: zodResolver(PurchaseSettingsFormSchema),
      // shouldFocusError: false,
    },
    validated
  )

  return <RootForms />
}
