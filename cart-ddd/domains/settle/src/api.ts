import { apiSettleForStripeMock } from '../mocks'

const isProduction = process.env.NODE_ENV === 'production'
// TODO 決済プロバイダーの複数対応の設定等の仕様検討
export const apiSettle = isProduction ? apiSettleForStripeMock : apiSettleForStripeMock
