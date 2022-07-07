import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { FormDefForSampleForms } from './FormDefForSample'

type TargetType = typeof FormDefForSampleForms
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: FormDefForSampleForms } as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  args: {
    hoge: '',
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}
