import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { SelectForm } from '.'

type TargetType = typeof SelectForm
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: SelectForm } as ComponentMeta<TargetType>

const itemDefs = { no1: { name: 'no1', label: '選択肢1' }, no2: { name: 'no2', label: '選択肢2' } }

export const Normal: RequiredStoryObj = {
  args: {
    ft: 'select',
    name: 'aaaa',
    label: 'ははは',
    itemDefs,
  },
}

export const Error: RequiredStoryObj = {
  args: {
    ft: 'select',
    name: 'aaaa',
    label: 'ははは',
    itemDefs,

    color: 'error',
  },
}

export const CustomByTw: RequiredStoryObj = {
  // TODO storyName 設定が反省されない問題の調査
  storyName: 'tailwindcss のクラス名を使ったサンプル',
  args: {
    ft: 'select',
    name: 'aaaa',
    label: 'ははは',
    itemDefs,

    //TODO Twの VSCode のプラグインによる補完のきかせ方について調査
    className: 'rounded-r-full',
  },
}
