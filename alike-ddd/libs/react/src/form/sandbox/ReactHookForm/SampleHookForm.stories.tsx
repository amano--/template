import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { SampleHookForm } from './SampleHookForm'
import { within, userEvent } from '@storybook/testing-library'

type TargetType = typeof SampleHookForm
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: SampleHookForm } as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  args: {
    firstName: '太郎',
    lastName: 'サンプル',
    age: 33,
    age2: 34,
    email: 'sample@sample.com',
  },
}

export const InvalidAfterSubmit: RequiredStoryObj = {
  args: {
    firstName: '',
    lastName: '',
    age: -10,
    age2: 'aaa' as unknown as number,
    email: '',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    await userEvent.click(canvas.getByText('送信'))
  },
}
