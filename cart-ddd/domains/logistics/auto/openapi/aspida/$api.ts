import type { AspidaClient, BasicHeaders } from 'aspida'
import type { Methods as Methods0 } from './order'
import type { Methods as Methods1 } from './orders/_orderId@string'

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '')
  const PATH0 = '/order'
  const PATH1 = '/orders'
  const GET = 'GET'
  const POST = 'POST'

  return {
    order: {
      /**
       * Create a new delivery order.
       * @returns OK
       */
      post: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, PATH0, POST, option).json(),
      /**
       * Create a new delivery order.
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
           * Retrieve the information of the user with the matching user ID.
           * @returns OK
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * Retrieve the information of the user with the matching user ID.
           * @returns OK
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods1['get']['resBody'], BasicHeaders, Methods1['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          $path: () => `${prefix}${prefix1}`
        }
      }
    }
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
