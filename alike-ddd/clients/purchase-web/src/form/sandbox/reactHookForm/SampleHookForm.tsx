import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select } from 'react-daisyui'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const schema = z.object({
  firstName: z.string().max(5),
  lastName: z.string().max(5),
  email: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
  age2: z.number().or(
    z
      .string()
      .refine((v) => {
        return !isNaN(Number(v))
      }, 'error message')
      .transform(Number)
  ),

  // .string()
  // // カスタムバリデーション
  // .refine((v) => {
  //   return !isNaN(Number(v))
  // }, 'error message')
  // // 値を変換
  // .transform((v) => {
  //   return Number(v)
  // }),
})

export type Schema = z.infer<typeof schema>

export const SampleHookForm: FC<Schema> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    defaultValues: props,
    resolver: zodResolver(schema),
  })
  // const onSubmit: SubmitHandler<Schema> = (data) => console.log(data)
  const onSubmit = (data: Schema) => console.log(data)

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        firstName : <Input color="primary" {...register('firstName')} />
        {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
        lastName :<Input color="primary" {...register('lastName')} />
        {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
        email : <Input color="primary" {...register('email')} />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        age :<Input color="primary" type="number" {...register('age')} />
        {errors.age?.message && <p>{errors.age?.message}</p>}
        age2 :<Input color="primary" type="text" {...register('age2')} />
        {errors.age2?.message && <p>{errors.age2?.message}</p>}
        <Button color="primary" type="submit">
          送信
        </Button>
      </form>

      <Select color="primary">
        <Select.Option value="no1">選択肢1</Select.Option>
        <Select.Option value="no2" selectedValue="no2" selected>
          選択肢2
        </Select.Option>
        <option value="no3" selected>
          選択肢3
        </option>
      </Select>
    </>
  )
}
