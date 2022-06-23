import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { SampleForm } from './SampleForm'

export default { component: SampleForm } as ComponentMeta<typeof SampleForm>

export const Index: ComponentStoryObj<typeof SampleForm> = {
  args: {
    title: 'お名前フォーム',
  },
}
