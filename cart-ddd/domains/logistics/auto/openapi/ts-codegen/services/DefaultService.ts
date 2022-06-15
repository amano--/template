/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryOrder } from '../models/DeliveryOrder';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Your GET endpoint
     * @param orderId
     * @returns DeliveryOrder OK
     * @throws ApiError
     */
    public static getOrdersOrderId(
        orderId: string,
    ): CancelablePromise<Array<DeliveryOrder>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders/{orderId}',
            path: {
                'orderId': orderId,
            },
        });
    }

    /**
     * @param orderId
     * @returns any OK
     * @throws ApiError
     */
    public static putOrdersOrderId(
        orderId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/orders/{orderId}',
            path: {
                'orderId': orderId,
            },
        });
    }

    /**
     * @returns DeliveryOrder OK
     * @throws ApiError
     */
    public static postOrder(): CancelablePromise<DeliveryOrder> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/order',
        });
    }

}
