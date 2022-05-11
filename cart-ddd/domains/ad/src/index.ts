import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'

export type AdSelectEvent = { eventType: 'AdSelect'; fromType: string }

export type AdSelectEventLog = AdSelectEvent & { logId: string }

export type AdToPurchaseNaviEvent = { eventType: 'AdToPurchaseNavi'; fromType: string; naviToPurchaseUrl: string }

export type AdSelected = { commandType: 'AdSelected' }

const adApiMock = {
  saveSelectAd: (e: AdSelectEvent): Promise<AdSelectEventLog> =>
    Promise.resolve({
      ...e,
      logId: ulid(Temporal.Now.instant().epochMilliseconds),
    }),
}

export const adApi = process.env.NODE_ENV === 'production' ? adApiMock : adApiMock
