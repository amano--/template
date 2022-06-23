import { purchaseApiMock } from '../mocks'
const isProduction = process.env.NODE_ENV === 'production'
export const apiPurchase = isProduction ? purchaseApiMock : purchaseApiMock
