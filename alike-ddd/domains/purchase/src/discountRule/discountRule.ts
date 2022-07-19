import { assignLogger, Money, toLogCategory } from '@alike-ddd/common'
import { SaleProduct } from '../purchase'
const logger = assignLogger(toLogCategory(__dirname))

export type DiscountRule = {}

// export type EmphasisType = 'strong' emphasis: EmphasisType;
export type DiscountResult = { label: string; money: Money }

// export type DiscounterForSimple = (money: Money) => DiscountResult
// export type DiscounterForSaleProduct = (saleProduct: SaleProduct) => DiscountResult

type NormalInput = { t: 'normal'; money: Money }
type SaleProductInput = { t: 'saleProduct'; saleProduct: SaleProduct }
type DiscounterInput = NormalInput | SaleProductInput

export type Discounter = (input: DiscounterInput) => DiscountResult

export const priceDiscounter: Discounter = (input: DiscounterInput) => {
  return { label: '', money: Money.create(500) }
}
