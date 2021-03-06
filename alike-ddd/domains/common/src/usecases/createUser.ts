import { CreateUserAccountEvent, apiCommon, assignLogger } from '../index'

// import {  } from '@alike-ddd/common/src/api'

const logger = assignLogger('usecases/createUser')

export const createAccount = async (e: CreateUserAccountEvent) => {
  logger.info('createAccount : ', 'e=', e)
  return await apiCommon.createAccount(e)
}

// TODO 後で実装
// export const createProfile = async (e: CreateUserAccountEvent) => { }
