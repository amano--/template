import { BoundedContext, BoundedContextKey } from '../boundedContext'
const ja = { querySuccess: '検索が成功しました' } as const
// export type MessagesType = typeof baseMessage
// export type MessageKey = keyof typeof baseMessage

const en = { querySuccess: 'query success' } as const

const messages = { ja, en } as const
type MessagesAllType = typeof messages
type MessageKey = keyof typeof messages['ja']

export type DefaultLangKey = 'ja'
export const defaultLangKey: DefaultLangKey = 'ja'
export type SupportLang = DefaultLangKey | keyof MessagesAllType

export type PickMessageValues<
  KEY extends keyof MESSAGES[DefaultLangKey],
  MESSAGES extends { [P in SupportLang]: any },
  LANG extends SupportLang = SupportLang
> = MESSAGES[LANG][KEY]

export const createCommonMessageFinder =
  (key: MessageKey) =>
  //| (string & {})
  (lang: SupportLang = defaultLangKey): PickMessageValues<MessageKey, typeof messages> =>
    messages[lang][key] ?? messages['en'][key]

// type A = PickMessageValues<'querySuccess', MessagesAllType>
