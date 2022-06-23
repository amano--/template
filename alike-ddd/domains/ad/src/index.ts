import { ulid } from 'ulidx'
import { Temporal } from '@js-temporal/polyfill'
import { ResponseEvent } from '@alike-ddd/common'

export type AdSelectEvent = { q: 'AdSelect'; fromType: string }

export type AdSelectEventLog = AdSelectEvent & { logId: string }

export type AdToPurchaseNaviEvent = ResponseEvent & {
  r: 'AdToPurchaseNavi'
  rt: 'alt'
  fromType: string
  naviToPurchaseUrl: string
}

export type AdSelected = { commandType: 'AdSelected' }

// todo Temporal.Now のテストの方法調査
const adApiMock = {
  saveEvent: (e: AdSelectEvent): Promise<AdSelectEventLog> =>
    Promise.resolve({
      ...e,
      logId: ulid(Temporal.Now.instant().epochMilliseconds),
    }),
}

// TODO apiの実装変換の方法の検討
export const adApi = process.env.NODE_ENV === 'production' ? adApiMock : adApiMock
