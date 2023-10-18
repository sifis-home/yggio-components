/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {NextRouter} from 'next/router';
import {FlexColWrapper, FlexMaxWidthWrapper} from '../../global/styled';
import {CenteredPage} from '../../global/components';
import UnitSummaryPane from './containers/unit-summary-pane';
import UnitDevicesPane from './containers/unit-devices-pane';
import UnitSubunitsPane from './containers/unit-subunits-pane';
import UnitMembersPane from './containers/unit-members-pane';
import UnitTabBar from './containers/unit-tab-bar';
import OrganizationSidebar from '../organization-sidebar';
import CreateUnitPane from './containers/create-unit-pane';
import UnitAddMemberPane from './containers/unit-add-member-pane';
import EditUnitPane from './containers/edit-unit-pane';
import ContainerBox from '../../components/container-box';
import {themesApi} from '../../api';
import {ORG_TAB_ITEMS} from '../../constants';

const UNIT_TAB_ITEMS = {
  summary: 'summary',
  members: 'members',
  subunits: 'subunits',
  devices: 'devices',
  addSubunit: 'addSubunit',
  createMember: 'createMember',
  edit: 'edit',
};

const NOT_FOUND = 'NOT_FOUND';

interface OrganizationUnitProps {
  router: NextRouter;
  orgId: string;
  unitId: string;
  tabId: keyof typeof ORG_TAB_ITEMS;
}

const OrganizationUnit = (props: OrganizationUnitProps) => {
  const [logo, setLogo] = React.useState<string | null>(null);
  const getThemeLogoQuery = themesApi.useThemesQuery({
    orgId: props.orgId,
  });

  React.useEffect(() => {
    const themeData = getThemeLogoQuery.data;
    const theme = _.find(themeData, data => data.orgId === props.orgId);
    if (theme) {
      const themeLogo = theme.logo?.data as string;
      if (themeLogo) {
        const setFile = () => {
          setLogo(themeLogo);
        };
        void setFile();
      }
    } else {
      setLogo(null);
    }

  }, [getThemeLogoQuery.data]);

  return (
    <FlexMaxWidthWrapper>
      <OrganizationSidebar
        router={props.router}
        orgId={props.orgId}
        tabId={props.tabId}
        unitId={props.unitId}
        logo={logo}
      />
      <CenteredPage>
        <ContainerBox>
          <FlexColWrapper>
            <UnitTabBar
              router={props.router}
              orgId={props.orgId}
              tabId={props.tabId}
              unitId={props.unitId}
            />
            {{
              [UNIT_TAB_ITEMS.summary]: (
                <UnitSummaryPane
                  router={props.router}
                  orgId={props.orgId}
                  unitId={props.unitId}
                />
              ),
              [UNIT_TAB_ITEMS.members]: (
                <UnitMembersPane
                  router={props.router}
                  orgId={props.orgId}
                  unitId={props.unitId}
                />
              ),
              [UNIT_TAB_ITEMS.subunits]: (
                <UnitSubunitsPane
                  router={props.router}
                  orgId={props.orgId}
                  unitId={props.unitId}
                />
              ),
              [UNIT_TAB_ITEMS.devices]: (
                <UnitDevicesPane
                  router={props.router}
                  orgId={props.orgId}
                  unitId={props.unitId}
                />
              ),
              [UNIT_TAB_ITEMS.addSubunit]: (
                <CreateUnitPane
                  router={props.router}
                  orgId={props.orgId}
                  unitId={props.unitId}
                />
              ),
              [UNIT_TAB_ITEMS.createMember]: (
                <UnitAddMemberPane
                  router={props.router}
                  orgId={props.orgId}
                  unitId={props.unitId}
                />
              ),
              [UNIT_TAB_ITEMS.edit]: (
                <EditUnitPane
                  router={props.router}
                  orgId={props.orgId}
                  unitId={props.unitId}
                />
              ),
              [NOT_FOUND]: (
                <h1>{'No unit TAB match found'}</h1>
              ),
            }[UNIT_TAB_ITEMS[props.tabId] || NOT_FOUND]}
          </FlexColWrapper>

        </ContainerBox>
      </CenteredPage>
    </FlexMaxWidthWrapper>
  );
};

export default OrganizationUnit;
