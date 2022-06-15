/* tslint:disable */
/* eslint-disable */
/**
 * s
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface DoraemonOption
 */
export interface DoraemonOption {
    /**
     * 
     * @type {string}
     * @memberof DoraemonOption
     */
    optionTag?: DoraemonOptionOptionTagEnum;
    /**
     * 
     * @type {string}
     * @memberof DoraemonOption
     */
    name?: DoraemonOptionNameEnum;
    /**
     * 
     * @type {boolean}
     * @memberof DoraemonOption
     */
    takekoputaerPresent?: boolean;
}


/**
 * @export
 */
export const DoraemonOptionOptionTagEnum = {
    Doraemon: 'Doraemon'
} as const;
export type DoraemonOptionOptionTagEnum = typeof DoraemonOptionOptionTagEnum[keyof typeof DoraemonOptionOptionTagEnum];

/**
 * @export
 */
export const DoraemonOptionNameEnum = {
    : 'ドラえもんオプション'
} as const;
export type DoraemonOptionNameEnum = typeof DoraemonOptionNameEnum[keyof typeof DoraemonOptionNameEnum];


export function DoraemonOptionFromJSON(json: any): DoraemonOption {
    return DoraemonOptionFromJSONTyped(json, false);
}

export function DoraemonOptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): DoraemonOption {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'optionTag': !exists(json, 'optionTag') ? undefined : json['optionTag'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'takekoputaerPresent': !exists(json, 'takekoputaerPresent') ? undefined : json['takekoputaerPresent'],
    };
}

export function DoraemonOptionToJSON(value?: DoraemonOption | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'optionTag': value.optionTag,
        'name': value.name,
        'takekoputaerPresent': value.takekoputaerPresent,
    };
}
