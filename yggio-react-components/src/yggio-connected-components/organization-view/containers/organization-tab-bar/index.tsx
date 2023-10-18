import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';
import {createSelector} from 'reselect';

import TabBar from '../../../../components/tab-bar';
import {organizationsApi, devicesApi} from '../../../../api';
import {Organization, IdKeyedDevices} from '../../../../types';
import {ORG_TAB_ITEMS} from '../../../../constants';

const TAB_ITEMS_DATA = [
  {
    label: 'Summary',
    tabId: ORG_TAB_ITEMS.summary,
  },
  {
    label: 'Members',
    tabId: ORG_TAB_ITEMS.members,
  },
  {
    label: 'Devices',
    tabId: ORG_TAB_ITEMS.devices,
  },
] as const;

interface OrganizationTabBarProps {
  router: NextRouter;
  tabId: keyof typeof ORG_TAB_ITEMS;
  orgId: string;
}

const OrganizationTabBar = (props: OrganizationTabBarProps) => {
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const orgDevices = organizationsApi.useOrganizationsDeviceQuery({orgId: props.orgId});
  const deviceIds = _.map(orgDevices.data?.deviceDetails, detail => detail.resourceId);
  const seekDevicesQuery = devicesApi.useSeekDevicesQuery({
    params: {deviceItems: _.compact(deviceIds)},
  });
  const tabItems = tabItemsSelector({
    organization: organizationQuery.data,
    devices: seekDevicesQuery.data,
  });

  return (
    <TabBar
      tabItems={tabItems}
      setActiveTab={async (tabId: string) => props.router.push(`/organizations/${props.orgId}/${tabId}`)}
      activeTab={props.tabId}
    />
  );
};

const tabItemsSelector = createSelector(
  (props: {organization?: Organization}) => props.organization,
  (props: {devices?: IdKeyedDevices}) => props.devices,
  (organization, devices) => {
    const numMembers = _.size(_.get(organization, 'members'));
    const numDevices = _.size(devices);
    const metaData = {
      [ORG_TAB_ITEMS.summary]: undefined,
      [ORG_TAB_ITEMS.members]: `${numMembers}`,
      [ORG_TAB_ITEMS.devices]: `${numDevices}`,
    };
    const combined = _.map(TAB_ITEMS_DATA, data => ({
      ...data,
      meta: metaData[data.tabId],
    }));
    return combined;
  },
);
export default OrganizationTabBar;
