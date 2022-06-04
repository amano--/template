import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'
// import { string } from 'fp-ts'
import { MockUserAccountIdType } from './tbd_for_code_completion_from_mock'
import { MessageFinder, messageFindersForCommon } from '@me/common'
import { AllViewId } from './boundedContext'
import { number } from 'fp-ts'

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

export type ResponseBaseEvent = {
  r: string
  // logId?: Ulid
}
export type ResponseSuccessEvent = ResponseBaseEvent & {
  rt: 'success'
}
export type ResponseAltEvent = ResponseBaseEvent & {
  rt: 'alt'
}
export type ResponseExceptionEvent = ResponseBaseEvent & {
  rt: 'exception'
}

export type ResponseNaviEvent = ResponseBaseEvent & {
  rt: 'navi'
  viewId: AllViewId
}

export type ResponseCommandSuccessEvent = ResponseSuccessEvent & {
  logId: Ulid
}

/**
 * サーバーのレスポンスに使用する 出力用イベント
 *
 * @param  r TaggedUnionのタグとして使用するため、ユニークなイベント名を設定する。BoundedContextでユニークかシステムでユニークにするかはTBD。キー名はresponse の頭文字。
 * @param rt キー名はresponse type の略。success 正常フロー alt 代替フロー exception 例外フロー
 */
export type ResponseEvent =
  | ResponseSuccessEvent
  | ResponseAltEvent
  | ResponseExceptionEvent
  | ResponseNaviEvent
  | ResponseCommandSuccessEvent

// export type ResponseEventWithMessage<FINDER extends MessageFinder> = ResponseEvent & {
//   msg: FINDER
// }
// export type ExceptionEvent = { x: string }
// export type EtcEvent = { e: string } & UnsaveEvent

export type InputEvent = CommandEvent | QueryEvent | UserEvent //| FetchEvent
export type OutputEvent = ResponseEvent

export type AllEvent = InputEvent | OutputEvent
// type AllEvent = {
//   [P in keyof (CommandEvent & QueryEvent & UserEvent & FetchEvent & EtcEvent)]?: string
// }

export type SingleQuerySuccessEvent<T> = ResponseSuccessEvent & {
  r: 'SingleQuerySuccess'
  message: typeof messageFindersForCommon.querySuccess
  datum: T
}

export const newSingleQuerySuccessEvent = <T>(datum: T): SingleQuerySuccessEvent<T> => ({
  r: 'SingleQuerySuccess',
  rt: 'success',
  message: messageFindersForCommon.querySuccess,
  datum,
})

export type ListQuerySuccessEvent<T> = ResponseSuccessEvent & {
  r: 'ListQuerySuccess'
  message: typeof messageFindersForCommon.listQuerySuccess
  list: T[]
}

export const newListQuerySuccessEvent = <T>(list: T[]): ListQuerySuccessEvent<T> => ({
  r: 'ListQuerySuccess',
  rt: 'success',
  message: messageFindersForCommon.listQuerySuccess,
  list,
})

export type PagedQuerySuccessEvent<T> = ListQuerySuccessEvent<T> & {
  r: 'PagedQuerySuccess'
  rt: 'success'

  //TODO ページングに関する情報を精査し正しく設定
  max: number
  count: number
  pageCount: number
  pageStep: number
}
