// import { ulid, decodeTime } from 'ulidx'

import { AdSelectEvent, AdToPurchaseNaviEvent, adApi } from '@me/ad'

import { getLogger } from 'log4js'
const logger = getLogger('usecases/selectAd')
// logger.level = 'info'

/*

*/
export const purchaseUsecase = 'purchaseUsecase'

export const selectAd = async (e: AdSelectEvent): Promise<AdToPurchaseNaviEvent> => {
  logger.info('event :', e)
  const log = await adApi.saveEvent(e)
  logger.info('save log=', log)

  return Promise.resolve({
    eventType: 'AdToPurchaseNavi',
    fromType: e.fromType,
    naviToPurchaseUrl: '/purchase',
  })
}

export const addToCart = async (e: ItemSelectEvent): Promise<AdToPurchaseNaviEvent> => {
  logger.info('event :', e)
  const log = await adApi.saveEvent(e)
  logger.info('save log=', log)

  return Promise.resolve({
    eventType: 'AdToPurchaseNavi',
    fromType: e.fromType,
    naviToPurchaseUrl: '/purchase',
  })
}
