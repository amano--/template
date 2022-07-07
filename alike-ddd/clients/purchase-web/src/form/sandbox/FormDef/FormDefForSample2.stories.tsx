import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { FormDefForSampleForms2 } from './FormDefForSample'

type TargetType = typeof FormDefForSampleForms2
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: FormDefForSampleForms2 } as ComponentMeta<TargetType>

export const Valid: RequiredStoryObj = {
  args: {
    name: '日本太郎',
    gender: 'male',
    profession: 'director',
    volume: 25,
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}

export const Invalid: RequiredStoryObj = {
  args: {
    name: 'invalid name',
    gender: undefined as unknown as 'male', //'hoge' as 'male',
    profession: undefined as unknown as 'employee',
    volume: 1000,
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    await userEvent.click(canvas.getByText('送信'))
  },
}
