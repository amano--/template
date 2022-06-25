import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from 'react-daisyui'

import { z } from 'zod'

export const schema = z.object({
  firstName: z.string().max(5),
  lastName: z.string().max(5),
  email: z.string().min(1, { message: 'Required' }),
  age: z.number().min(10),
})

export type Schema = z.infer<typeof schema>

export const SampleHookForm: FC<Schema> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  // const onSubmit: SubmitHandler<Schema> = (data) => console.log(data)
  const onSubmit = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      firstName : <Input color="primary" {...register('firstName')} />
      {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
      lastName :<Input color="primary" {...register('lastName')} />
      {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
      email : <Input color="primary" {...register('email')} />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      age :<Input color="primary" type="number" {...register('age')} />
      {errors.age?.message && <p>{errors.age?.message}</p>}
      <Input color="primary" type="submit" />
    </form>
  )
}
