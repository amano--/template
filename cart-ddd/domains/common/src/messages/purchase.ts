import { defaultLangKey, PickMessageValues, SupportLang, DefaultLangKey } from './common'

const ja = { settleCartFail: '決済が失敗しました' } as const
const en = { settleCartFail: 'settle fail' } as const

const messages = { ja, en } as const
type MessageKey = keyof typeof messages[DefaultLangKey]

export const findPurchaseMessage = (
  key: MessageKey,
  lang: SupportLang = defaultLangKey
): PickMessageValues<MessageKey, typeof messages> => messages[lang][key] ?? messages['en'][key]

// type A = PickMessageValues<'settleCartFail', typeof messages>
