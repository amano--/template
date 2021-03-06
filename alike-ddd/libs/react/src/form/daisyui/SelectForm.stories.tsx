import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { newSelectForm } from '.'
import { SelectDef } from '../FormDef'

const items = { no1: { name: 'no1', label: '選択肢1' }, no2: { name: 'no2', label: '選択肢2' } }
const def: SelectDef = { ft: 'select', name: 'formName', label: 'ラベル', required: true, items }
const SelectForm = newSelectForm(def)

type TargetType = typeof SelectForm
type StoryObj = ComponentStoryObj<TargetType>
// type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: SelectForm } as ComponentMeta<TargetType>

export const Normal: StoryObj = {
  args: {},
}

export const SelectNo2: StoryObj = {
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
