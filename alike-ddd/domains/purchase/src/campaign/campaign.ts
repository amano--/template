import { assignLogger } from '@alike-ddd/common'
const logger = assignLogger('domains/purchase/campaign/campaign')

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type CampaignId = string //MockCampaignIdType
export type Campaign = { campaignId: CampaignId }

// __dirname/
