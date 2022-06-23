/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type DoraemonOption = {
    optionTag?: DoraemonOption.optionTag;
    name?: DoraemonOption.name;
    takekoputaerPresent?: boolean;
};

export namespace DoraemonOption {

    export enum optionTag {
        DORAEMON = 'Doraemon',
    }

    export enum name {
        _ = 'ドラえもんオプション',
    }


}

