import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './user'
import type { Methods as Methods1 } from './users/_userId@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '')
  const PATH0 = '/user'
  const PATH1 = '/users'
  const GET = 'GET'
  const POST = 'POST'
  const PATCH = 'PATCH'

  return {
    user: {
      /**
       * Create a new user.
       * @param option.body - Post the necessary fields for the API to create a new user.
       * @returns User Created
       */
      post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
      /**
       * Create a new user.
       * @param option.body - Post the necessary fields for the API to create a new user.
       * @returns User Created
       */
      $post: (option: { body: Methods0['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    users: {
      _userId: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          /**
           * Retrieve the information of the user with the matching user ID.
           * @returns User Found
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * Retrieve the information of the user with the matching user ID.
           * @returns User Found
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * Update the information of an existing user.
           * @param option.body - Patch user properties to update.
           * @returns User Updated
           */
          patch: (option: { body: Methods1['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix1, PATCH, option).json(),
          /**
           * Update the information of an existing user.
           * @param option.body - Patch user properties to update.
           * @returns User Updated
           */
          $patch: (option: { body: Methods1['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods1['patch']['resBody'], BasicHeaders, Methods1['patch']['status']>(prefix, prefix1, PATCH, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
