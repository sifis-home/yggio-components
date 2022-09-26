/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import OrganizationTabBar from './containers/organization-tab-bar';
import OrganizationSidebar from './containers/organization-sidebar';
import {FlexColWrapper, FlexMaxWidthWrapper} from '../../../global/styled';
import {CenteredPage} from '../../../global/components';
import OrganizationSummaryPane from './containers/organization-summary-pane';
import OrganizationMembersPane from './containers/organization-members-pane';
import OrganizationDevicesPane from './containers/organization-devices-pane';
import CreateMemberPane from './containers/create-member-pane';
import EditOrganizationPane from './containers/edit-organization-pane';
import ContainerBox from '../../../components/container-box';

const ORG_TAB_ITEMS = {
  summary: 'summary',
  members: 'members',
  devices: 'devices',
  createMember: 'createMember',
  edit: 'edit',
};
const NOT_FOUND = 'NOT_FOUND';

const OrganizationView = props => {
  return (
    <FlexMaxWidthWrapper>
      <OrganizationSidebar
        router={props.router}
        orgId={props.orgId}
        tabId={props.tabId}
      />
      <CenteredPage>
        <ContainerBox>
          <FlexColWrapper>
            <OrganizationTabBar
              router={props.router}
              orgId={props.orgId}
              tabId={props.tabId}
            />
            {{
              [ORG_TAB_ITEMS.summary]: (
                <OrganizationSummaryPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.members]: (
                <OrganizationMembersPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.devices]: (
                <OrganizationDevicesPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.createMember]: (
                <CreateMemberPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [ORG_TAB_ITEMS.edit]: (
                <EditOrganizationPane
                  orgId={props.orgId}
                  router={props.router}
                />
              ),
              [NOT_FOUND]: (
                <h1>{'No organization TAB match found'}</h1>
              ),
            }[ORG_TAB_ITEMS[props.tabId] || NOT_FOUND]}
          </FlexColWrapper>
        </ContainerBox>
      </CenteredPage>
    </FlexMaxWidthWrapper>
  );
};

export default OrganizationView;
