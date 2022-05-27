import { commonApiMock, commonApiProductionSample, purchaseApiMock } from '@me/mocks'

//const isProduction: true = true
const isProduction = process.env.NODE_ENV === 'production'

export const commonApi = isProduction ? commonApiProductionSample : commonApiMock

export const purchaseApi = isProduction ? purchaseApiMock : purchaseApiMock
