import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { SetFormPerItem } from './FormDefForSample'

type TargetType = typeof SetFormPerItem
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: SetFormPerItem } as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  storyName: '個別にFormItemを配置した場合',
  args: {
    name: '日本花子',
    gender: 'female',
    profession: 'other',
    volume: 75,
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}
