import { ComponentMeta, ComponentStoryObj } from '@storybook/react'
import { InputTextForm } from '.'

type TargetType = typeof InputTextForm
type RequiredStoryObj = ComponentStoryObj<TargetType> & { args: Parameters<TargetType>[0] }

export default { component: InputTextForm } as ComponentMeta<TargetType>

export const Normal: RequiredStoryObj = {
  args: {
    ft: 'text',
    name: 'aaaa',
    label: 'ははは',
    required: true,
  },
}

export const Disabled: RequiredStoryObj = {
  args: {
    ft: 'text',
    name: 'aaaa',
    label: 'ははは',

    disabled: true,
  },
}

export const Error: RequiredStoryObj = {
  args: {
    ft: 'text',
    name: 'aaaa',
    label: 'ははは',

    color: 'error',
  },
}

export const CustomByTw: RequiredStoryObj = {
  // TODO storyName 設定が反省されない問題の調査
  storyName: 'tailwindcss のクラス名を使ったサンプル',
  args: {
    ft: 'text',
    name: 'aaaa',
    label: 'ははは',

    //TODO Twの VSCode のプラグインによる補完のきかせ方について調査
    className: 'rounded-r-full',
  },
}
