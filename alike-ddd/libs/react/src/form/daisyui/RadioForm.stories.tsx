import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { newRadioForm } from './RadioForm'
import { RadioDef } from '../FormDef'

const items = { no1: { name: 'no1', label: '選択肢1' }, no2: { name: 'no2', label: '選択肢2' } }
const def: RadioDef = { ft: 'radio', name: 'formName', label: 'ラベル', required: true, items }
const RadioForm = newRadioForm(def)

type TargetType = typeof RadioForm
type StoryObj = ComponentStoryObj<TargetType>
// type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: RadioForm } as ComponentMeta<TargetType>

export const Normal: StoryObj = {
  args: {},
}

export const RadioNo2: StoryObj = {
  args: {
    value: 'no2',
  },
}

export const Error: StoryObj = {
  args: {
    error: 'エラーが発生しました',
  },
}

export const CustomByTw: StoryObj = {
  name: 'tailwindcss のクラス名を使ったサンプル',
  args: {
    //TODO Twの VSCode のプラグインによる補完のきかせ方について調査
    className: 'rounded-r-full',
  },
}
