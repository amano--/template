import {
  newLogId,
  CreateUserAccountEvent,
  CreateUserAccountSuccessEvent,
  CreateUserAccountDuplicatedExceptionEvent,
} from '@me/common'

import { getLogger } from 'log4js'
const logger = getLogger('mocks/common/api')

const mutations = {
  createAccount: (e: CreateUserAccountEvent & { productionOnlyParam?: string }) => {
    logger.info('createAccount : event=', e)

    if (e.input.name === 'duplicated') {
      return Promise.resolve<CreateUserAccountDuplicatedExceptionEvent>({
        r: 'CreateUserAccountDuplicatedException',
      })
    }
    return Promise.resolve<CreateUserAccountSuccessEvent & { productionOnlyResult: string }>({
      r: 'CreateUserAccountSuccess',
      userId: newLogId(),
      name: e.input.name,
      logId: newLogId(),
      productionOnlyResult: 'productionOnlyResult',
    })
  },
}

const queries = {
  findHoge: async (input: { hoge: string }): Promise<{ count: number }[]> => {
    logger.info('findHoge : input=', input)
    return Promise.resolve([{ count: 998 }])
  },
}

export const commonApiProductionSample = { ...mutations, ...queries }