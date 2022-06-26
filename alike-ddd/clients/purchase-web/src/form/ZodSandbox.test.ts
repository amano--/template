import { z, ZodError } from 'zod'
import { InvalidAfterSubmit, Normal } from './SampleHookForm.stories'

const schema = z.object({
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
})

type Schema = z.infer<typeof schema>

describe('simple test', () => {
  it('valid', () => {
    const res = schema.parse(Normal.args)
    expect(res).toEqual(Normal.args)
  })

  it('invalid', async () => {
    // TODO なぜか下記コードだとErrorをCatchできないようなので調査
    // expect(await schema.parse(InvalidAfterSubmit.args)).toThrowError(ZodError)
    try {
      const res = schema.parse(InvalidAfterSubmit.args)
      expect(false).toBeTruthy()
    } catch (error) {
      if (error instanceof ZodError) {
        // console.log(error)
        expect(error instanceof ZodError).toBeTruthy()
      } else {
        expect(false).toBeTruthy()
      }
    }
  })
})
