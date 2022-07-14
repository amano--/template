import { messageFindersForCommon } from '@alike-ddd/common'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { within, userEvent } from '@storybook/testing-library'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecommendProductsPC } from './RecommendProductsPanel'
import { RecoilRoot } from 'recoil'

type TargetType = typeof RecommendProductsPC
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default {
  component: RecommendProductsPC,
} as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  args: {
    list: [{ productId: 'normal' }, { productId: 'relate1' }],
    message: messageFindersForCommon.listQuerySuccess,
    r: 'ListQuerySuccess',
    rt: 'success',
  },
  // play: async (ctx) => {
  //   const canvas = within(ctx.canvasElement)
  //   await userEvent.click(canvas.getByText('送信'))
  // },
}
