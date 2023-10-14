/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.wso2.identity.apps.common.listner;

import org.apache.commons.lang.StringUtils;
import org.wso2.carbon.identity.organization.management.service.OrganizationManager;
import org.wso2.carbon.identity.organization.management.service.exception.OrganizationManagementServerException;
import org.wso2.carbon.identity.organization.management.service.util.Utils;
import org.wso2.carbon.stratos.common.beans.TenantInfoBean;
import org.wso2.carbon.stratos.common.exception.StratosException;
import org.wso2.carbon.stratos.common.listeners.TenantMgtListener;
import org.wso2.carbon.user.api.UserStoreException;
import org.wso2.carbon.user.core.service.RealmService;
import org.wso2.identity.apps.common.internal.AppsCommonDataHolder;
import org.wso2.identity.apps.common.util.AppPortalUtils;

/**
 * App portal tenant management listener.
 */
public class AppPortalTenantMgtListener implements TenantMgtListener {

    @Override
    public void onTenantCreate(TenantInfoBean tenantInfoBean) throws StratosException {

        try {
            if (isOrganization(tenantInfoBean)) {
                return;
            }
            AppPortalUtils.initiatePortals(tenantInfoBean.getTenantDomain(), tenantInfoBean.getTenantId());
        } catch (Exception e) {
            throw new StratosException("Failed to initialize UI portals for the tenant:"
                + tenantInfoBean.getTenantDomain(), e);
        }
    }

    @Override
    public void onTenantUpdate(TenantInfoBean tenantInfoBean) throws StratosException {

    }

    @Override
    public void onTenantDelete(int i) {

    }

    @Override
    public void onTenantRename(int i, String s, String s1) throws StratosException {

    }

    @Override
    public void onTenantInitialActivation(int i) throws StratosException {

    }

    @Override
    public void onTenantActivation(int i) throws StratosException {

    }

    @Override
    public void onTenantDeactivation(int i) throws StratosException {

    }

    @Override
    public void onSubscriptionPlanChange(int i, String s, String s1) throws StratosException {

    }

    @Override
    public int getListenerOrder() {

        return 100;
    }

    @Override
    public void onPreDelete(int i) throws StratosException {

    }

    /**
     * Check whether the tenant is an organization.
     *
     * @param tenantInfoBean Tenant info bean.
     * @return True if the tenant is an organization.
     * @throws UserStoreException
     * @throws OrganizationManagementServerException
     */
    private boolean isOrganization(TenantInfoBean tenantInfoBean) throws UserStoreException,
        OrganizationManagementServerException {

        RealmService realmService = AppsCommonDataHolder.getInstance().getRealmService();
        String organizationUUID = realmService.getTenantManager().getTenant(tenantInfoBean.getTenantId())
            .getAssociatedOrganizationUUID();
        if (StringUtils.isBlank(organizationUUID)) {
            return false;
        }

        OrganizationManager organizationManager = AppsCommonDataHolder.getInstance().getOrganizationManager();
        int organizationDepth = organizationManager.getOrganizationDepthInHierarchy(organizationUUID);
        return Utils.isSubOrganization(organizationDepth);
    }
}
