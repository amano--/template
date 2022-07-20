import { assignLogger, Money, toLogCategory } from '@alike-ddd/common'
import { SaleProduct } from '../purchase'

const logger = assignLogger(toLogCategory(__dirname))

// export type DiscountRule = {}

// export type EmphasisType = 'strong' emphasis: EmphasisType;
export type DiscountResult = { label: string; money: Money }

// export type DiscounterForSimple = (money: Money) => DiscountResult
// export type DiscounterForSaleProduct = (saleProduct: SaleProduct) => DiscountResult

// type NormalInput = { t: 'normal'; money: Money }
type SaleProductInput = { t: 'saleProduct'; saleProduct: SaleProduct }
// type CampaignInput = { t: 'campaign'; campaign: 'Campaign' }
type DiscounterInput = Money | SaleProductInput

export type Discounter = (input: DiscounterInput) => DiscountResult

export const priceDiscounter =
  (discountMoney: Money): Discounter =>
  (input: DiscounterInput) => {
    if (Money.isMoney(input)) {
      const money = input.subtract(discountMoney)
      return { label: discountMoney.label() + '引き', money }
    }

    switch (input.t) {
      case 'saleProduct':
      default:
        //TODO あとで実装
        throw new Error('あとで実装する')
    }
  }
