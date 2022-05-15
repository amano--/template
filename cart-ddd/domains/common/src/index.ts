export * from './api'

export type Ulid = string

export type PickCommandEvent<A> = A extends { c: string } ? A : never
export type PickQueryEvent<A> = A extends { q: string } ? A : never

import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'

export const newLogId = (seedTime?: number) => ulid(seedTime ?? Temporal.Now.instant().epochMilliseconds)
