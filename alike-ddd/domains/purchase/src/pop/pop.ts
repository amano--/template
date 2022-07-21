import { SaleProductId } from '../purchase'
import { assignLogger, UserId } from '@alike-ddd/common'
// eslint-disable-next-line no-undef
const logger = assignLogger('domains/purchase/pop')

// TBD テストデータを設定する時補完ができるように実験的に型を設定している。基本は string
export type PopId = string //MockPopIdType
export type Pop = { icon?: string; message: string }
export type Pops = { list: readonly Pop[] }

export type SaleProductPop = Pop
export type SaleProductPops = Pops

const newSaleProductPops = (saleProductId: SaleProductId, accountId: UserId): SaleProductPops => {
  return { list: [] }
}

export const SaleProductPops = { newPops: newSaleProductPops }
