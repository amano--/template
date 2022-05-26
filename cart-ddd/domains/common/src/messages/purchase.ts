import {
  defaultLangKey,
  PickMessageValues,
  SupportLang,
  DefaultLangKey,
  isSupportLang,
  defaultUseAtNotSupportLangKey,
  LangAny,
} from './common'

const ja = { settleCartFail: '決済が失敗しました' } as const
const en = { settleCartFail: 'settle fail' } as const

const messages = { ja, en } as const
type MessageKey = keyof typeof messages[DefaultLangKey]

export const createMessageFinderForPurchase =
  (key: MessageKey) =>
  (lang: LangAny = defaultLangKey): PickMessageValues<MessageKey, typeof messages> =>
    isSupportLang(lang) ? messages[lang][key] : messages[defaultUseAtNotSupportLangKey][key]

// export const findPurchaseMessage = (
//   key: MessageKey,
//   lang: SupportLang = defaultLangKey
// ): PickMessageValues<MessageKey, typeof messages> =>
//   isSupportLang(lang) ? messages[lang][key] : messages[defaultUseAtNotSupportLangKey][key]

// type A = PickMessageValues<'settleCartFail', typeof messages>
