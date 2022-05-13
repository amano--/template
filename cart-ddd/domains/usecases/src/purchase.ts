import { getLogger } from 'log4js'
const logger = getLogger('usecases/purchase')

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
