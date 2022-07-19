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
// type CampaignInput = { t: 'campaign'; campaign: 'Campaign' }
type DiscounterInput = NormalInput | SaleProductInput

export type Discounter = (input: DiscounterInput) => DiscountResult

export const priceDiscounter: (discountValue: Money) => Discounter =
  (discountValue: Money) => (input: DiscounterInput) => {
    switch (input.t) {
      case 'normal':
        return { label: `${discountValue}`, money: input.money.subtract(discountValue) }

      case 'saleProduct':
        //TODO あとで実装
        throw new Error('あとで実装する')
    }
  }
