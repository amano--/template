import { commonApiMock, commonApiProductionSample, purchaseApiMock, settleApiMock } from '@me/mocks'

//const isProduction: true = true
const isProduction = process.env.NODE_ENV === 'production'

export const commonApi = isProduction ? commonApiProductionSample : commonApiMock

export const settleApi = isProduction ? settleApiMock : settleApiMock

export const purchaseApi = isProduction ? purchaseApiMock : purchaseApiMock
