// 参考 https://codesandbox.io/s/qx2r0?file=/.storybook/preview.js:0-456
import { createRoot } from 'solid-js'
import { insert, template, createComponent } from 'solid-js/web'

export const decorators = [
  (Story) =>
    createRoot(() => {
      console.log('.storybook/preview.js : Story = ', Story)
      const element = template('<div/>').cloneNode(true)
      insert(element, createComponent(Story, {}))
      return element
    }),
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
