import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { CustomFormItems } from './SampleForm'

type TargetType = typeof CustomFormItems
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: CustomFormItems } as ComponentMeta<TargetType>

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
  //   await userEvent.click(canvas.getByText('登録'))
  // },
}
