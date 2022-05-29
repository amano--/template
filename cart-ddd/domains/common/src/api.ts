import { commonApiMock, commonApiProductionSample, purchaseApiMock } from '@me/mocks'
import { settleApiMock } from '../../mocks/src/settle/api'

//const isProduction: true = true
const isProduction = process.env.NODE_ENV === 'production'

export const commonApi = isProduction ? commonApiProductionSample : commonApiMock

export const purchaseApi = isProduction ? purchaseApiMock : purchaseApiMock

export const settleApi = isProduction ? settleApiMock : settleApiMock
