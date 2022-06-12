/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** Retrieve the information of the user with the matching user ID. */
  get: {
    status: 200
    /** User Found */
    resBody: Types.User
  }

  /** Update the information of an existing user. */
  patch: {
    status: 200
    /** User Updated */
    resBody: Types.User

    /** Patch user properties to update. */
    reqBody: {
      firstName: string
      lastName: string
      /** If a new email is given, the user's email verified property will be set to false. */
      email: string
      dateOfBirth: string
    }
  }
}
