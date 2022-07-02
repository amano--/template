import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { FormDefForSampleForms2 } from './FormDefForSample'

type TargetType = typeof FormDefForSampleForms2
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: FormDefForSampleForms2 } as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  args: {
    name: '自分のなまえ',
    gender: 'female',
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}
