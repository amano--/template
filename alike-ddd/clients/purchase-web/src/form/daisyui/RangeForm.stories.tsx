import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { RangeForm as createRangeForm } from './RangeForm'
import { RangeDef } from '../FormDef'

const def: RangeDef = { ft: 'range', name: 'formName', label: 'ラベル', required: true, min: 0, max: 100, step: 25 }

const RangeForm = createRangeForm(def)

type TargetType = typeof RangeForm

type PartialStoryObj = ComponentStoryObj<TargetType>
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: RangeForm } as ComponentMeta<TargetType>

export const Normal: PartialStoryObj = {
  args: {
    ft: 'range',
    def,
  },
}
