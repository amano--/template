import { commonApiMock } from '@me/mocks'

export const commonApi = process.env.NODE_ENV === 'production' ? commonApiMock : commonApiMock
