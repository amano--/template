import { assignLogger, toLogCategory } from '@alike-ddd/common'
const logger = assignLogger(toLogCategory(__dirname))

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type CampaignId = string //MockCampaignIdType
export type Campaign = { campaignId: CampaignId }

type OneDayPerYearCampaign = { amount: number }

logger.debug('fuga')

// 敬老の日
export const respectForTheAgedDay: OneDayPerYearCampaign = { amount: 300 } as const

export const Campaign = { respectForTheAgedDay }
