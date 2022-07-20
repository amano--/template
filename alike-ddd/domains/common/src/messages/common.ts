const ja = {
  querySuccess: '検索が成功しました',
  listQuerySuccess: (args: { count: number }) => `${args.count}件 検索されました`,
} as const
// export type MessagesType = typeof baseMessage
// export type MessageKey = keyof typeof baseMessage

const en = {
  querySuccess: 'query success',
  listQuerySuccess: (args: { count: number }) => `${args.count} searched`,
} as const

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
export type MessageFinder<MSG = string> = (lang: LangAny) => MSG

export type PickMessageValues<
  KEY extends keyof MESSAGES[DefaultLangKey],
  MESSAGES extends { [P in SupportLang]: any },
  LANG extends SupportLang = SupportLang
> = MESSAGES[LANG][KEY]

export const createMessageFinder =
  <K extends MessageKey>(key: K) =>
  (lang: LangAny = defaultLangKey): PickMessageValues<K, typeof messages> =>
    isSupportLang(lang) ? messages[lang][key] : messages[defaultUseAtNotSupportLangKey][key]

// type A = PickMessageValues<'querySuccess', MessagesAllType>

export const messageFindersForCommon = {
  querySuccess: createMessageFinder('querySuccess'),
  listQuerySuccess: createMessageFinder('listQuerySuccess'),
}

// export type OmitFunction<T> =
