/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** Create a new user. */
  post: {
    status: 200
    /** User Created */
    resBody: Types.User

    /** Post the necessary fields for the API to create a new user. */
    reqBody: {
      firstName: string
      lastName: string
      email: string
      dateOfBirth: string
    }
  }
}
