import { commonApiMock, commonApiProductionSample, purchaseApiMock } from '@me/mocks'

export const purchaseApi = process.env.NODE_ENV === 'production' ? purchaseApiMock : purchaseApiMock

export const commonApi = process.env.NODE_ENV === 'production' ? commonApiProductionSample : commonApiMock
