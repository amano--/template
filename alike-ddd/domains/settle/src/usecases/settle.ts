import { apiSettle } from '../api'

import { getLogger } from 'log4js'
import { SettleEvent } from '../types'
const logger = getLogger('settle/usecases/settle')

// TODO 適当実装
export const settle = async (e: SettleEvent) => {
  logger.info('settle : ', 'e=', e)
  return await apiSettle.settle(e)
}
