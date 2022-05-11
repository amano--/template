// import { ulid, decodeTime } from 'ulidx'

import { AdSelectEvent, AdToPurchaseNaviEvent } from '@me/ad'
import { getLogger } from 'log4js'
import { selectAd } from '../src/selectAd'

const logger = getLogger('scenario/buyItem')

/*

流入元を記録する
流入情報に基づきリダイレクト先を算出し返却

*/
export const purchaseUsecase = 'purchaseUsecase'

export const buyItem = async (e: AdSelectEvent) => {
  logger.info(`event : ${e}`)
  const log = await selectAd(e)
  logger.info('save log=' + log)

  return Promise.resolve<AdToPurchaseNaviEvent>({
    eventType: 'AdToPurchaseNavi',
    fromType: 'mobile',
    naviToPurchaseUrl: '/purchase',
  })
}
