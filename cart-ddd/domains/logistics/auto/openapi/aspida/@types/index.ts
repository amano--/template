/* eslint-disable */
export type User = {
  /** Unique identifier for the given user. */
  id: number
  firstName: string
  lastName: string
  email: string
  dateOfBirth?: string | undefined
  /** Set to true if the user's email has been verified. */
  emailVerified: boolean
  /** The date that the user was created. */
  createDate?: string | undefined
}

export type DeliveryProvider = DeliveryProviderByDoraemon | DeliveryProviderByHattori

export type DeliveryProviderByDoraemon = {
  id?: string | undefined
  label?: string | undefined
  doraemon?: string | undefined
}

export type DeliveryProviderByHattori = {
  id?: string | undefined
  label?: string | undefined
  hattori?: string | undefined
}
