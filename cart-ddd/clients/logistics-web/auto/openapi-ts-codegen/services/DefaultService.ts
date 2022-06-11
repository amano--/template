/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Error } from '../models/Error';
import type { NewPet } from '../models/NewPet';
import type { Pet } from '../models/Pet';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Returns all pets from the system that the user has access to
     * Nam sed condimentum est. Maecenas tempor sagittis sapien, nec rhoncus sem sagittis sit amet. Aenean at gravida augue, ac iaculis sem. Curabitur odio lorem, ornare eget elementum nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, tincidunt varius justo. In hac habitasse platea dictumst. Integer at adipiscing ante, a sagittis ligula. Aenean pharetra tempor ante molestie imperdiet. Vivamus id aliquam diam. Cras quis velit non tortor eleifend sagittis. Praesent at enim pharetra urna volutpat venenatis eget eget mauris. In eleifend fermentum facilisis. Praesent enim enim, gravida ac sodales sed, placerat id erat. Suspendisse lacus dolor, consectetur non augue vel, vehicula interdum libero. Morbi euismod sagittis libero sed lacinia.
     *
     * Sed tempus felis lobortis leo pulvinar rutrum. Nam mattis velit nisl, eu condimentum ligula luctus nec. Phasellus semper velit eget aliquet faucibus. In a mattis elit. Phasellus vel urna viverra, condimentum lorem id, rhoncus nibh. Ut pellentesque posuere elementum. Sed a varius odio. Morbi rhoncus ligula libero, vel eleifend nunc tristique vitae. Fusce et sem dui. Aenean nec scelerisque tortor. Fusce malesuada accumsan magna vel tempus. Quisque mollis felis eu dolor tristique, sit amet auctor felis gravida. Sed libero lorem, molestie sed nisl in, accumsan tempor nisi. Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend lorem. Pellentesque vitae felis pretium, pulvinar elit eu, euismod sapien.
     *
     * @param tags tags to filter by
     * @param limit maximum number of results to return
     * @returns Pet pet response
     * @returns Error unexpected error
     * @throws ApiError
     */
    public static findPets(
        tags?: Array<string>,
        limit?: number,
    ): CancelablePromise<Array<Pet> | Error> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pets',
            query: {
                'tags': tags,
                'limit': limit,
            },
        });
    }

    /**
     * Creates a new pet in the store. Duplicates are allowed
     * @param requestBody Pet to add to the store
     * @returns Pet pet response
     * @returns Error unexpected error
     * @throws ApiError
     */
    public static addPet(
        requestBody: NewPet,
    ): CancelablePromise<Pet | Error> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/pets',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Returns a user based on a single ID, if the user does not have access to the pet
     * @param id ID of pet to fetch
     * @returns Pet pet response
     * @returns Error unexpected error
     * @throws ApiError
     */
    public static findPetById(
        id: number,
    ): CancelablePromise<Pet | Error> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/pets/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * deletes a single pet based on the ID supplied
     * @param id ID of pet to delete
     * @returns Error unexpected error
     * @throws ApiError
     */
    public static deletePet(
        id: number,
    ): CancelablePromise<Error> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/pets/{id}',
            path: {
                'id': id,
            },
        });
    }

}
