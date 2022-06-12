import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './_userId@number'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '')
  const PATH0 = '/users'
  const GET = 'GET'
  const PATCH = 'PATCH'

  return {
    _userId: (val0: number) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        /**
         * Retrieve the information of the user with the matching user ID.
         * @returns User Found
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * Retrieve the information of the user with the matching user ID.
         * @returns User Found
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        /**
         * Update the information of an existing user.
         * @param option.body - Patch user properties to update.
         * @returns User Updated
         */
        patch: (option: { body: Methods0['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods0['patch']['resBody'], BasicHeaders, Methods0['patch']['status']>(prefix, prefix0, PATCH, option).json(),
        /**
         * Update the information of an existing user.
         * @param option.body - Patch user properties to update.
         * @returns User Updated
         */
        $patch: (option: { body: Methods0['patch']['reqBody'], config?: T | undefined }) =>
          fetch<Methods0['patch']['resBody'], BasicHeaders, Methods0['patch']['status']>(prefix, prefix0, PATCH, option).json().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
