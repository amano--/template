import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { OnlyPresentationalComponent } from './SampleForm'

type TargetType = typeof OnlyPresentationalComponent
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: OnlyPresentationalComponent } as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  args: {
    hoge: '',
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('登録'))
  // },
}
