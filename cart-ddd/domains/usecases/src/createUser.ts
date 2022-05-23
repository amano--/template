import { CreateUserAccountEvent, commonApi } from '@me/common'

// import {  } from '@me/common/src/api'

import { getLogger } from 'log4js'
const logger = getLogger('usecases/createUser')

export const createAccount = async (e: CreateUserAccountEvent) => {
  logger.info('createAccount : ', 'e=', e)
  return await commonApi.createAccount(e)
}

// TODO 後で実装
// export const createProfile = async (e: CreateUserAccountEvent) => { }
// export const createUserLank = async (e: CreateUserAccountEvent) => {}
