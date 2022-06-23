import {
  CreateUserAccountEvent,
  CreateUserAccountSuccessEvent,
  CreateUserAccountDuplicatedExceptionEvent,
  newLogId,
  UserLank,
} from '@alike-ddd/common'

import { getLogger } from 'log4js'
const logger = getLogger('mocks/common/api')

// const simpleProducts = [{ productId: 'normal' }, { productId: 'outOfStock' }]
// const relatedProducts = [{ productId: '5' }, { productId: '6' }]

const mutations = {
  // saveEvent: (e: PurchaseCommandEvent): Promise<PurchaseEventLog> => {
  //   logger.info('saveEvent : event=', e)

  //   return Promise.resolve({
  //     ...e,
  //     logId: newLogId(),
  //   })
  // },

  createAccount: (e: CreateUserAccountEvent) => {
    logger.info('createAccount : event=', e)

    if (e.input.name === 'duplicated') {
      return Promise.resolve<CreateUserAccountDuplicatedExceptionEvent>({
        r: 'CreateUserAccountDuplicatedException',
        rt: 'exception',
      })
    }
    return Promise.resolve<CreateUserAccountSuccessEvent>({
      r: 'CreateUserAccountSuccess',
      rt: 'success',
      userId: newLogId(),
      name: e.input.name,
      lank: UserLank.get('None'),

      logId: newLogId(),
    })
  },
}

const queries = {
  // findProductStock: async (input: [ProductId]): Promise<{ count: number }[]> => {
  //   logger.info('findProductStock : input=', input)
  //   const results = input.map((id) => {
  //     // 品切れ状態の設定
  //     if (id === 'outOfStock') {
  //       return { count: 0 }
  //     }
  //     return { count: 3 }
  //   })
  //   return Promise.resolve(results)
  // },
  // listProducts: async (input: ListProductsInputEvent): Promise<Product[]> => {
  //   logger.info('listProducts : input=', input)
  //   return Promise.resolve(simpleProducts)
  // },
  // listRelatedProducts: async (input: [ProductId]): Promise<Product[]> => {
  //   logger.info('listRelatedProducts : input=', input)
  //   return Promise.resolve(relatedProducts)
  // },
}

export const commonApiMock = { ...mutations, ...queries }
