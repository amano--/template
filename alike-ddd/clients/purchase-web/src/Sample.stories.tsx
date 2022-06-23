import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { Sample } from './Sample'

export default { component: Sample } as ComponentMeta<typeof Sample>

export const Index: ComponentStoryObj<typeof Sample> = {
  args: {
    title: 'お名前フォーム',
  },
}
