import { BoundedContext, BoundedContextKey } from '../boundedContext'
const ja = { querySuccess: '検索が成功しました' } as const
// export type MessagesType = typeof baseMessage
// export type MessageKey = keyof typeof baseMessage

const en = { querySuccess: 'query success' } as const

const messages = { ja, en } as const

export type DefaultLangKey = 'ja'
type MessagesAllType = typeof messages
type MessageKey = keyof typeof messages[DefaultLangKey]

export const defaultLangKey: DefaultLangKey = 'ja'
export const defaultUseAtNotSupportLangKey: keyof MessagesAllType = 'en'
export type SupportLang = DefaultLangKey | keyof MessagesAllType

export const isSupportLang = (arg: string): arg is SupportLang => {
  return arg === defaultLangKey || Object.keys(messages).some((lang) => lang === arg)
}

// UI層から任意の文字列で渡せるように型を足している
export type LangAny = SupportLang | (string & {})

export type PickMessageValues<
  KEY extends keyof MESSAGES[DefaultLangKey],
  MESSAGES extends { [P in SupportLang]: any },
  LANG extends SupportLang = SupportLang
> = MESSAGES[LANG][KEY]

export const createMessageFinder =
  (key: MessageKey) =>
  (lang: LangAny = defaultLangKey): PickMessageValues<MessageKey, typeof messages> =>
    isSupportLang(lang) ? messages[lang][key] : messages[defaultUseAtNotSupportLangKey][key]

// type A = PickMessageValues<'querySuccess', MessagesAllType>
