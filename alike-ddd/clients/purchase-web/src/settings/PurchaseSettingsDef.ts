import { InputTextDef, SelectDef, RangeDef, ToFormsProps, RadioDef } from '@alike-ddd/react-libs'

import { z } from 'zod'

const handleName: InputTextDef = {
  ft: 'text',
  name: 'handleName',
  label: 'ハンドル名',
  required: true,
}

// const genderItems = {
//   male: { name: 'male', label: '男性' },
//   female: { name: 'female', label: '女性' },
//   other: { name: 'other', label: 'その他' },
// } as const

// const genderItemKeys = Object.keys(genderItems) as unknown as readonly [string, ...string[]]

// const gender: SelectDef<typeof genderItems> = {
//   ft: 'select',
//   name: 'gender',
//   label: '性別',
//   required: false,
//   items: genderItems,
// }

// // 職業
// const professionItems = {
//   employee: { name: 'employee', label: '会社員' },
//   director: { name: 'director', label: '会社役員' },
//   other: { name: 'other', label: 'その他' },
// } as const

// const profession: RadioDef<typeof professionItems> = {
//   ft: 'radio',
//   name: 'profession',
//   label: '職業',
//   required: true,
//   items: professionItems,
// } as const

// const volume: RangeDef = {
//   ft: 'range',
//   name: 'volume',
//   label: 'ボリューム',
//   required: true,

//   min: 0,
//   max: 100,
//   step: 25,
// }

export const purchaseSettingsDef = { handleName } as const
// export const purchaseSettings = { name, gender, profession, volume } as const

export type PurchaseSettingsFormsProps = ToFormsProps<typeof purchaseSettingsDef>

export const PurchaseSettingsFormSchema = z.object({
  handleName: z.string().max(5),
  // gender: z.enum(genderItemKeys), //string().max(5),
  // profession: z.string(),
  // volume: z
  //   .number()
  //   .min(0)
  //   .max(100)
  //   .or(
  //     z
  //       .string()
  //       .refine((v) => {
  //         return !isNaN(Number(v))
  //       }, 'error message')
  //       .transform(Number)
  //   ),
})
