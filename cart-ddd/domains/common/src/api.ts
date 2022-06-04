import { commonApiMock, commonApiProductionSample } from '../mocks'

// TBD mock apiの管理、公開、切り替え方法の検討
const isProduction = process.env.NODE_ENV === 'production'

export const apiCommon = isProduction ? commonApiProductionSample : commonApiMock

// export const apiSettle = isProduction ? settleApiMock : settleApiMock

// export const apiPurchase = isProduction ? purchaseApiMock : purchaseApiMock
