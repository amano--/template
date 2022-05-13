// import { ulid, decodeTime } from 'ulidx'

import { AdSelectEvent, AdToPurchaseNaviEvent, adApi } from '@me/ad'

import { getLogger } from 'log4js'
const logger = getLogger('usecases/ad')
// logger.level = 'info'

/*

*/
export const purchaseUsecase = 'purchaseUsecase'

export const selectAd = async (e: AdSelectEvent): Promise<AdToPurchaseNaviEvent> => {
  logger.info('selectAd : event = ', e)
  const log = await adApi.saveEvent(e)
  logger.info('save log=', log)

  return Promise.resolve({
    eventType: 'AdToPurchaseNavi',
    fromType: e.fromType,
    naviToPurchaseUrl: '/purchase',
  })
}
