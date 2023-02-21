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

import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { Section } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect } from "react";
import { Divider } from "semantic-ui-react";
import { AppConstants, history } from "../../core";
import { getSettingsSectionIcons } from "../../server-configurations";
import { useTokenReuseConfigData } from "../api";
import { Trans, useTranslation } from "react-i18next";


/**
 * Props for my account settings page.
 */
type MyAccountSettingsPageInterface = IdentifiableComponentInterface;

/**
 * Governance connector listing page.
 *
 * @param props - Props injected to the component.
 * @returns Governance connector listing page component.
 */
export const PrivateKeyJWTConfig: FunctionComponent<MyAccountSettingsPageInterface> = (
    props: MyAccountSettingsPageInterface
): ReactElement => {
    const { [ "data-componentid" ]: componentId } = props;
    const { t } = useTranslation();

    const {
        data: tokenReuseData,
        isLoading: isLoading,
        error: tokenReuseDataFetchError,
        mutate: mutateTokenReuseData
    } = useTokenReuseConfigData();

    useEffect(() => {
        if (isLoading) {
            return;
        }

    }, [ isLoading ]);

    /**
     * Handle connector advance setting selection.
     */
    const handleSelection = () => {
        history.push(AppConstants.getPaths().get("PRIVATE_KEY_JWT_CONFIG_EDIT"));
    };

    return (
        <Section
            data-componentid={ `${componentId}-settings-section` }
            // eslint-disable-next-line max-len
            description={ t("console:manage.features.jwtPrivateKeyConfiguration.description")}
            icon={ getSettingsSectionIcons().passwordValidation }
            header={ t(
                "console:manage.features.jwtPrivateKeyConfiguration.pageTitle" 
            ) }
            onPrimaryActionClick={ handleSelection }
            primaryAction={ "Configure" }
            connectorEnabled={ isLoading ? undefined : tokenReuseData.enableTokenReuse }
        >
            <Divider hidden/>
        </Section>
    );
};

/**
 * Default props for the component.
 */
PrivateKeyJWTConfig.defaultProps = {
    "data-componentid": "private-key-jwt-config-page"
};

/**
 * A default export was added to support React.lazy.
 * TODO: Change this to a named export once react starts supporting named exports for code splitting.
 * @see {@link https://reactjs.org/docs/code-splitting.html#reactlazy}
 */
export default PrivateKeyJWTConfig;
