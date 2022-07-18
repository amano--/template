import { assignLogger } from '@alike-ddd/common'
const logger = assignLogger('domains/purchase/pop/pop')

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type PopId = string //MockPopIdType
export type Pop = { popId: PopId }

