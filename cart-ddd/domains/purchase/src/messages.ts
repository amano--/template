// TODO import 周りをいい感じにする
import {
  defaultLangKey,
  PickMessageValues,
  SupportLang,
  DefaultLangKey,
  isSupportLang,
  defaultUseAtNotSupportLangKey,
  LangAny,
} from '@alike-ca/common/src/messages/common'

const ja = {
  cartAddSuccess: 'カートに商品が追加されました',
  settleCartFail: '決済が失敗しました',
} as const

const en = {
  cartAddSuccess: 'The product has been added to the cart',
  settleCartFail: 'settle fail',
} as const

const messages = { ja, en } as const
type MessageKey = keyof typeof messages[DefaultLangKey]

export const createMessageFinderForPurchase =
  <K extends MessageKey>(key: K) =>
  (lang: LangAny = defaultLangKey): PickMessageValues<K, typeof messages> =>
    isSupportLang(lang) ? messages[lang][key] : messages[defaultUseAtNotSupportLangKey][key]

export const messageFindersForPurchase = { cartAddSuccess: createMessageFinderForPurchase('cartAddSuccess') }

// export const findPurchaseMessage = (
//   key: MessageKey,
//   lang: SupportLang = defaultLangKey
// ): PickMessageValues<MessageKey, typeof messages> =>
//   isSupportLang(lang) ? messages[lang][key] : messages[defaultUseAtNotSupportLangKey][key]

// type A = PickMessageValues<'settleCartFail', typeof messages>
