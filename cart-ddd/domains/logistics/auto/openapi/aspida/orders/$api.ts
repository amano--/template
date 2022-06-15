import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './_orderId@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:6003' : baseURL).replace(/\/$/, '')
  const PATH0 = '/orders'
  const GET = 'GET'
  const PUT = 'PUT'

  return {
    _orderId: (val0: string) => {
      const prefix0 = `${PATH0}/${val0}`

      return {
        /**
         * @returns OK
         */
        get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix0, GET, option).json(),
        /**
         * @returns OK
         */
        $get: (option?: { config?: T | undefined } | undefined) =>
          fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, prefix0, GET, option).json().then(r => r.body),
        put: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods0['put']['status']>(prefix, prefix0, PUT, option).send(),
        $put: (option?: { config?: T | undefined } | undefined) =>
          fetch<void, BasicHeaders, Methods0['put']['status']>(prefix, prefix0, PUT, option).send().then(r => r.body),
        $path: () => `${prefix}${prefix0}`
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
