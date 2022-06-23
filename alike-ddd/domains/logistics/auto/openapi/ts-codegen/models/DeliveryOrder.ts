/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DeliveryOrder = {
    userId?: string;
    purchaseId?: string;
    providerId?: DeliveryOrder.providerId;
    deliveryMethodId?: DeliveryOrder.deliveryMethodId;
    option: Array<any>;
    orderAt?: string;
};

export namespace DeliveryOrder {

    export enum providerId {
        DORAEMON = 'doraemon',
        GUNDAM = 'gundam',
    }

    export enum deliveryMethodId {
        DORA = 'dora',
        GUFU = 'gufu',
        GUNDAM = 'gundam',
        SUNEO = 'suneo',
    }


}

