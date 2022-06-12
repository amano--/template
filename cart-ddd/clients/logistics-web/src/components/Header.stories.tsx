// import { Meta, StoryObj } from '@storybook/html'
// import { Header, HeaderProps } from './Header'

// const component: Meta<Partial<typeof Header>> = { component: Header }
// export default component

// export const Index: StoryObj<HeaderProps> = {
//   args: {
//     title: 'MyHeader',
//   },
// }

import { Story, Meta } from '@storybook/html'
import { createRoot } from 'solid-js'
import { createComponent, insert, template } from 'solid-js/web'
import { Header, HeaderProps } from './Header'
// import { ComponentMeta, StoryObj } from '@storybook/html'

export default {
  title: 'my/Header',
  argTypes: {
    count: { control: 'number' },
  },
  // decorators: [
  //   (Story) => {
  //     return createRoot(() => {
  //       console.log('.storybook/preview.js : Story = ', Story)
  //       const element = template('<div/>').cloneNode(true)
  //       insert(element, createComponent(Story, {}))
  //       return element
  //     })
  //   },
  // ],
} as Meta

const Template: Story<HeaderProps> = (args) => <Header {...args} />

export const OneButton = Template.bind({})
OneButton.args = { title: 'aaassss' }
