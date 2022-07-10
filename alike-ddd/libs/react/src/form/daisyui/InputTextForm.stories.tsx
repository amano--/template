import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { newInputTextForm } from '.'
import { InputTextDef } from '../FormDef'

const def: InputTextDef = { ft: 'text', name: 'formName', label: 'ラベル', required: true }
const InputTextForm = newInputTextForm(def)

type TargetType = typeof InputTextForm
type TargetStory = ComponentStoryObj<TargetType>

export default { component: InputTextForm } as ComponentMeta<TargetType>

export const Normal: TargetStory = {
  args: {},
}

export const Disabled: TargetStory = {
  args: {
    disabled: true,
  },
}

export const Error: TargetStory = {
  args: {
    error: 'エラーが発生しました',
  },
}

export const CustomByTw: TargetStory = {
  name: 'tailwindcss のクラス名を使ったサンプル',
  args: {
    //TODO Twの VSCode のプラグインによる補完のきかせ方について調査
    className: 'rounded-r-full',
  },
}
