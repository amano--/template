import { Meta, StoryObj } from '@storybook/html'
import { Header, HeaderProps } from './Header'
import { createRoot } from 'solid-js'
import { createComponent, insert, template } from 'solid-js/web'

// TODO Solid.js を  CSF 3.0 で動作させる方法の調査

const component: Meta<HeaderProps> = {
  component: <p>ggggggg</p>, //Header,
  title: 'CSF3/Header',
  decorators: [
    (Story) => {
      return createRoot(() => {
        console.log('.storybook/preview.js : Story = ', Story)
        const element = template('<div/>').cloneNode(true)
        insert(element, createComponent(Story(), {}))
        return element
      })
    },
    //(story) => <div style="margin: 3em">{story()}</div>,
    // (Story, ctx) => {
    //   console.log('HeaderCSF3.stories : Story = ', Story)
    //   return createRoot(() => {
    //     console.log('HeaderCSF3.stories : Story = ', Story)
    //     const element = template('<div/>', 0).cloneNode(true)
    //     insert(element, createComponent(Header, ctx.args))
    //     return element
    //   })
    // },
  ],
}
export default component

export const Sample: StoryObj<HeaderProps> = {
  storyName: 'サンプル',
  args: {
    // title: 'MyHeader',
  },
}
