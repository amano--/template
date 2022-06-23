import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { CartPanel } from './Cart'

export default { component: CartPanel } as ComponentMeta<typeof CartPanel>

export const Index: ComponentStoryObj<typeof CartPanel> = {
  args: {
    title: 'お名前フォーム',
  },
}
