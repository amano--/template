import { purchaseApiMock } from '@me/mocks'

export const purchaseApi = process.env.NODE_ENV === 'production' ? purchaseApiMock : purchaseApiMock
