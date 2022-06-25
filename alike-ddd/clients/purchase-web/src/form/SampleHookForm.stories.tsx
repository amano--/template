import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { SampleHookForm } from './SampleHookForm'

type TargetType = typeof SampleHookForm
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: SampleHookForm } as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  args: {
    firstName: '太郎',
    lastName: 'サンプル',
    age: 33,
    email: 'sample@sample.com',
  },
}
