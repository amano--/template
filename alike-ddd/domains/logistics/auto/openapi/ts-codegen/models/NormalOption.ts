/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NormalOption = {
    optionTag?: NormalOption.optionTag;
    name?: NormalOption.name;
    okihai?: boolean;
};

export namespace NormalOption {

    export enum optionTag {
        NORMAL = 'Normal',
    }

    export enum name {
        _ = '通常オプション',
    }


}

