// import { ulid, decodeTime } from 'ulidx'

import { AdSelectEvent, AdToPurchaseNaviEvent, adApi } from '@alike-ddd/ad'
import { assignLogger } from '@alike-ddd/common'

const logger = assignLogger('usecases/ad')
// logger.level = 'info'

/*

*/
export const purchaseUsecase = 'purchaseUsecase'

export const selectAd = async (e: AdSelectEvent) => {
  logger.info('selectAd : event = ', e)
  const log = await adApi.saveEvent(e)
  logger.info('save log=', log)

  return Promise.resolve<AdToPurchaseNaviEvent>({
    r: 'AdToPurchaseNavi',
    rt: 'alt',
    fromType: e.fromType,
    naviToPurchaseUrl: '/purchase',
  })
}
