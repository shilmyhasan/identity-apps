/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { HttpMethods } from "@wso2is/core/models";
import { AsgardeoSPAClient, HttpClientInstance } from "@asgardeo/auth-react";
import useRequest, {
    RequestConfigInterface,
    RequestErrorInterface,
    RequestResultInterface
} from "../../../features/core/hooks/use-request";
import { store } from "../../core";
import { Config } from "../../core/configs";
import {UpdateJWTAuthenticatorConfigInterface} from "../models/private-key-jwt-config";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";


/**
 * Get an axios instance.
 *
 */
const httpClient: HttpClientInstance = AsgardeoSPAClient.getInstance()
    .httpRequest.bind(AsgardeoSPAClient.getInstance())
    .bind(AsgardeoSPAClient.getInstance());

/**
 * Get JTI reuse state
 *
 * @returns The response of the JTI reuse state.
 */
export const useTokenReuseConfigData = <Data = any, Error = RequestErrorInterface>(
): RequestResultInterface<Data, Error> => {

    const requestConfig: RequestConfigInterface = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: HttpMethods.GET,
        params: {},
        url: Config.getServiceResourceEndpoints().jwtAuthenticationServiceMgt
    };

    const { data, error, isValidating, mutate } = useRequest<Data, Error>(requestConfig, {
        shouldRetryOnError: false
    });

    return {
        data,
        error: error,
        isLoading: !data && !error,
        isValidating,
        mutate
    };
};

/**
 * Hook to update enterprise login enable config.
 *
 * @param {OrganizationInterface} isEnterpriseLoginEnabled - Enterpriselogin is enabled/disabled.
 * 
 * @return {Promise<any>} A promise containing the response.
 */
export const updateJWTConfig = (data: UpdateJWTAuthenticatorConfigInterface): Promise<any> => {
    
    const requestConfig: AxiosRequestConfig = {
        data:[data],
        headers: {
            "Accept": "application/json",
            "Access-Control-Allow-Origin": store.getState().config.deployment.clientHost,
            "Content-Type": "application/json"
        },
        method: HttpMethods.PATCH,
        url: Config.getServiceResourceEndpoints().jwtAuthenticationServiceMgt
    };

    return httpClient(requestConfig).then((response) => {
        return Promise.resolve(response);
    }).catch((error) => {
        return Promise.reject(error);
    });
};
