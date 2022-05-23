import { CreateUserAccountEvent, commonApi } from '@me/common'

import { getLogger } from 'log4js'
const logger = getLogger('usecases/createUser')

export const createAccount = async (e: CreateUserAccountEvent) => {
  logger.info('createAccount : ', 'event=', e)
  return await commonApi.createAccount(e)
}
