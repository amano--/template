import { apiSettle } from '../api'

import { SettleEvent } from '../types'
import { assignLogger } from '@alike-ddd/common'
const logger = assignLogger('settle/usecases/settle')

// TODO 適当実装
export const settle = async (e: SettleEvent) => {
  logger.info('settle : ', 'e=', e)
  return await apiSettle.settle(e)
}
