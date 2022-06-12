import { Meta, StoryObj } from '@storybook/html'
import { Header, HeaderProps } from './Header'

const component: Meta<HeaderProps> = { component: <div>aaaaa</div>, title: 'CSF3/Header' }
export default component

export const Index: StoryObj<HeaderProps> = {
  args: {
    title: 'MyHeader',
  },
}
