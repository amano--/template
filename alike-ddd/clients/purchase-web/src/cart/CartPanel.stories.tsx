import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { CartPanel } from './CartPanel'

type TargetType = typeof CartPanel
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: CartPanel } as ComponentMeta<TargetType>

export const Valid: RequiredStoryObj = {
  args: {
    handleName: '日本太郎',
    // gender: 'male',
    // profession: 'director',
    // volume: 25,
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}
