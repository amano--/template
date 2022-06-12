import { MockUserAccountIdType } from '../../mocks'
import { CommandLog, ResponseEvent } from '../event'
import { UserLank } from './lank'

export type UserId = MockUserAccountIdType

export type UserAccount = { userId: UserId; name: string; lank: UserLank }
export type EncryptedUserAccount = UserAccount & { encryptedPassword: string }
export type GuestAccount = { guest: true }

export const isGuest = (account: UserAccount | GuestAccount): account is GuestAccount => {
  return 'guest' in account
}

export type CreateUserAccountEvent = { c: 'CreateUserAccount'; input: { name: string } }

export type CreateUserAccountSuccessEvent = ResponseEvent & {
  r: 'CreateUserAccountSuccess'
  rt: 'success'
} & UserAccount &
  CommandLog

export type CreateUserAccountDuplicatedExceptionEvent = ResponseEvent & {
  r: 'CreateUserAccountDuplicatedException'
  rt: 'exception'
}
