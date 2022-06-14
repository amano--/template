import {
  newLogId,
  CreateUserAccountEvent,
  CreateUserAccountSuccessEvent,
  CreateUserAccountDuplicatedExceptionEvent,
} from '@alike-ca/common'

import { getLogger } from 'log4js'
import { UserLank } from '../src/user/lank'
const logger = getLogger('mocks/common/api')

const mutations = {
  createAccount: (e: CreateUserAccountEvent & { productionOnlyParam?: string }) => {
    logger.info('createAccount : event=', e)

    if (e.input.name === 'duplicated') {
      return Promise.resolve<CreateUserAccountDuplicatedExceptionEvent>({
        r: 'CreateUserAccountDuplicatedException',
        rt: 'exception',
      })
    }
    return Promise.resolve<CreateUserAccountSuccessEvent & { productionOnlyResult: string }>({
      r: 'CreateUserAccountSuccess',
      rt: 'success',
      userId: newLogId(),
      name: e.input.name,
      lank: UserLank.get('None'),
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
