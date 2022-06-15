import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './order'
import type { Methods as Methods1 } from './orders/_orderId@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:6003' : baseURL).replace(/\/$/, '')
  const PATH0 = '/order'
  const PATH1 = '/orders'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'

  return {
    order: {
      /**
       * @returns OK
       */
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
      /**
       * @returns OK
       */
      $post: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH0}`
    },
    orders: {
      _orderId: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          /**
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          put: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).send(),
          $put: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods1['put']['status']>(prefix, prefix1, PUT, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
