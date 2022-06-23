import { createMessageFinder, isSupportLang } from './common'

describe('isSupportLang', () => {
  it('SupportLangの対象の言語キーを設定', () => {
    expect(isSupportLang('ja')).toBeTruthy()
    expect(isSupportLang('en')).toBeTruthy()
  })
  it('SupportLangの言語以外を設定', () => {
    expect(isSupportLang('fr')).toBeFalsy()
  })
})

describe('多言語対応 - common', () => {
  const finder = createMessageFinder('querySuccess')
  it('SupportLangの言語が指定された場合、対応した文字列が返却される', () => {
    expect(finder('ja')).toEqual('検索が成功しました')
    expect(finder('en')).toEqual('query success')
  })
  it('SupportLangの言語以外が指定された場合、英語メッセージが返却される', () => {
    expect(finder('fr')).toEqual('query success')
  })
})
