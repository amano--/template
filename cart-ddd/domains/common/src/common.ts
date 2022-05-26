import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'
// import { string } from 'fp-ts'
import { MockUserAccountIdType } from './tbd_for_code_completion_from_mock'
import { createCommonMessageFinder, SupportLang } from './messages/common'

export type Ulid = string

export type PickCommandEvent<A> = A extends { c: string } ? A : never
export type PickQueryEvent<A> = A extends { q: string } ? A : never

export const newLogId = (seedTime?: number) => ulid(seedTime ?? Temporal.Now.instant().epochMilliseconds)

export type UnsaveEvent = { unsave?: boolean }

export type CommandEvent = { c: string } & UnsaveEvent
export type QueryEvent = { q: string } & UnsaveEvent
// export type FetchEvent = { f: string } & UnsaveEvent
export type UserEvent = { u: string } & UnsaveEvent

export type CommandLog = { logId?: Ulid }

// const querySuccess = createCommonMessageFinder('querySuccess')
/**
 * サーバーのレスポンスに使用する 出力用イベント
 *
 * @param  r TaggedUnionのタグとして使用するため、ユニークなイベント名を設定する。BoundedContextでユニークかシステムでユニークにするかはTBD。キー名はresponse の頭文字。
 * @param rt キー名はresponse type の略。success 正常フロー alt 代替フロー exception 例外フロー
 */
export type ResponseEvent = {
  r: string
  rt: 'success' | 'alt' | 'exception'
  logId?: Ulid
}
export type ResponseEventWithMessage<FINDER> = ResponseEvent & {
  msg: FINDER
}
// export type ExceptionEvent = { x: string }
// export type EtcEvent = { e: string } & UnsaveEvent

export type InputEvent = CommandEvent | QueryEvent | UserEvent //| FetchEvent
export type OutputEvent = ResponseEvent

export type AllEvent = InputEvent | OutputEvent
// type AllEvent = {
//   [P in keyof (CommandEvent & QueryEvent & UserEvent & FetchEvent & EtcEvent)]?: string
// }
export const commonFinder = { querySuccess: createCommonMessageFinder('querySuccess') }
// export const querySuccessFinder = createCommonMessageFinder('querySuccess')

export type QuerySuccessEvent<DATA> = ResponseEventWithMessage<typeof commonFinder['querySuccess']> & {
  r: 'QuerySuccess'
  rt: 'success'
  list: DATA[]
}
export type PagedQuerySuccessEvent<DATA> = QuerySuccessEvent<DATA> & {
  r: 'PagedQuerySuccess'
  //TODO ページングに関する情報を精査し正しく設定
  max: number
  count: number
  pageCount: number
  pageStep: number
}

export type UserId = MockUserAccountIdType

export type UserAccount = { userId: UserId; name: string }
export type EncryptedUserAccount = UserAccount & { encryptedPassword: string }
export type GuestAccount = { guest: true; fromUrl: string }

export const isGuest = (account: UserAccount | GuestAccount): account is GuestAccount => {
  return 'guest' in account
}

export type CreateUserAccountEvent = ResponseEvent & { r: 'CreateUserAccount'; rt: 'success'; input: { name: string } }

export type CreateUserAccountSuccessEvent = ResponseEvent & {
  r: 'CreateUserAccountSuccess'
  rt: 'success'
} & UserAccount &
  CommandLog

export type CreateUserAccountDuplicatedExceptionEvent = ResponseEvent & {
  r: 'CreateUserAccountDuplicatedException'
  rt: 'exception'
}

// export type AllEventRes = any // { logId?: Ulid }
