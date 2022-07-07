import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { FormDefForSampleForms2 } from './FormDefForSample'

type TargetType = typeof FormDefForSampleForms2
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: FormDefForSampleForms2 } as ComponentMeta<TargetType>

export const Valid: RequiredStoryObj = {
  args: {
    name: 'abcde',
    gender: 'female',
    volume: 50,
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}

export const Invalid: RequiredStoryObj = {
  args: {
    name: 'invalid name',
    gender: 'hoge' as 'male',
    volume: 1000,
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}
