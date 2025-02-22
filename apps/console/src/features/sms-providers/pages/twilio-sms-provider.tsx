/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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
import { FinalFormField, TextFieldAdapter } from "@wso2is/form";
import {
    EmphasizedSegment,
    Hint,
    PrimaryButton
} from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { Divider, Grid } from "semantic-ui-react";
import { SMSProviderConstants } from "../constants";

interface TwilioSMSProviderPageInterface extends IdentifiableComponentInterface {
    isReadOnly: boolean;
    onSubmit: (values: any) => void;
}

const TwilioSMSProvider: FunctionComponent<TwilioSMSProviderPageInterface> = (
    props: TwilioSMSProviderPageInterface
): ReactElement => {
    const {
        ["data-componentid"]: componentId,
        onSubmit,
        isReadOnly
    } = props;
    const { t } = useTranslation();

    return (
        <EmphasizedSegment className="form-wrapper" padded={ "very" }>
            <Grid>
                <Grid.Row columns={ 1 }>
                    <Grid.Column>
                        <h2>{ t("extensions:develop.smsProviders.form.twilio.subHeading") }</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 2 }>
                    <Grid.Column>
                        <FinalFormField
                            key="twilioKkey"
                            width={ 16 }
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            ariaLabel="twilioKey"
                            readOnly={ isReadOnly }
                            required={ true }
                            data-componentid={ `${componentId}-twilio-key` }
                            name="twilioKey"
                            type="text"
                            label={ t("extensions:develop.smsProviders.form.twilio.accountSID.label") }
                            placeholder={ t("extensions:develop.smsProviders.form.twilio.accountSID.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("extensions:develop.smsProviders.form.twilio.accountSID.hint") }
                                </Hint>
                            ) }
                            component={ TextFieldAdapter }
                            maxLength={ SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MAX_LENGTH }
                            minLength={ SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH }
                            autoComplete="new-password"
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <FinalFormField
                            key="twilioSecret"
                            width={ 16 }
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            readOnly={ isReadOnly }
                            ariaLabel="twilioSecret"
                            required={ true }
                            data-componentid={ `${componentId}-twilio-secret` }
                            name="twilioSecret"
                            type="password"
                            label={ t("extensions:develop.smsProviders.form.twilio.authToken.label") }
                            placeholder={ t("extensions:develop.smsProviders.form.twilio.authToken.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("extensions:develop.smsProviders.form.twilio.authToken.hint") }
                                </Hint>
                            ) }
                            component={ TextFieldAdapter }
                            maxLength={ SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MAX_LENGTH }
                            minLength={ SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH }
                            autoComplete="new-password"
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 2 }>
                    <Grid.Column>
                        <FinalFormField
                            key="twilioSender"
                            width={ 16 }
                            FormControlProps={ {
                                margin: "dense"
                            } }
                            readOnly={ isReadOnly }
                            ariaLabel="twilioSender"
                            required={ true }
                            data-componentid={ `${componentId}-twilio-sender` }
                            name="twilioSender"
                            type="text"
                            label={ t("extensions:develop.smsProviders.form.twilio.sender.label") }
                            placeholder={ t("extensions:develop.smsProviders.form.twilio.sender.placeholder") }
                            helperText={ (
                                <Hint compact>
                                    { t("extensions:develop.smsProviders.form.twilio.sender.hint") }
                                </Hint>
                            ) }
                            component={ TextFieldAdapter }
                            maxLength={ SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MAX_LENGTH }
                            minLength={ SMSProviderConstants.SMS_PROVIDER_CONFIG_FIELD_MIN_LENGTH }
                            autoComplete="new-password"
                        />
                    </Grid.Column>
                </Grid.Row>
                {
                    !isReadOnly && (
                        <>
                            <Divider hidden />
                            <Grid.Row columns={ 1 }>
                                <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 16 }>
                                    <PrimaryButton
                                        size="small"
                                        onClick={ onSubmit }
                                        ariaLabel="SMS provider form update button"
                                        data-componentid={ `${componentId}-update-button` }
                                    >
                                        { "Submit" }
                                    </PrimaryButton>
                                </Grid.Column>
                            </Grid.Row>
                        </>
                    )
                }
            </Grid>
        </EmphasizedSegment>
    );
};

export default TwilioSMSProvider;
