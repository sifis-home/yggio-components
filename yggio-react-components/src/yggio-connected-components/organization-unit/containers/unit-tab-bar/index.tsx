import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';

import {
  RESOURCE_SCOPES,
} from '../../../../constants';
import {organizationsApi, usersApi} from '../../../../api';
import TabBar from '../../../../components/tab-bar';
import {organizationUtils} from '../../../../utils';

const UNIT_TAB_ITEMS = {
  summary: 'summary',
  members: 'members',
  subunits: 'subunits',
  devices: 'devices',
};

const TAB_ITEMS_DATA = [
  {
    label: 'Summary',
    tabId: UNIT_TAB_ITEMS.summary,
  },
  {
    label: 'Members',
    tabId: UNIT_TAB_ITEMS.members,
  },
  {
    label: 'Subunits',
    tabId: UNIT_TAB_ITEMS.subunits,
  },
  {
    label: 'Devices',
    tabId: UNIT_TAB_ITEMS.devices,
  },
];

interface UnitTabBarProps {
  orgId: string;
  unitId: string;
  tabId: string;
  router: NextRouter;
}

const UnitTabBar = (props: UnitTabBarProps) => {
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const memberIds = organizationQuery.data?.members;
  const usersQuery = usersApi.useSeekUsersQuery(memberIds);
  const unit = organizationUtils.findUnit(organizationQuery.data, props.unitId);
  const deviceDetailsQuery = organizationsApi.useOrganizationsDeviceQuery({orgId: props.orgId});
  const members = _.compact(_.map(memberIds, member => {
    const users = _.keyBy(usersQuery.data, '_id');
    return users[member as keyof typeof users];
  }));
  const decomposedUnit = organizationUtils.decomposeUnit(organizationQuery.data, props.unitId);
  const subunits = _.compact(_.concat(decomposedUnit?.descendants, decomposedUnit?.unit));

  const tokens = organizationQuery.data?.accessTokens;
  const unitTokens = _.filter(tokens, token => token.unitId === props.unitId);

  const unitMemberIds = _.uniq(_.map(unitTokens, token => token.memberId));
  const unitMembers = _.filter(members, member => _.includes(unitMemberIds, member._id));
  const allowedUnitIds = _.map(subunits, subunit => subunit._id);
  const filteredDeviceDetails = _.filter(deviceDetailsQuery.data?.deviceDetails, deviceDetail => {
    const deviceUnitIds: string[] = []; // gets mutated
    _.each(RESOURCE_SCOPES, scope => {
      const permissions = deviceDetail[scope] || [];
      _.each(permissions, permission => {
        if (permission.resourceGroupType === 'orgUnit') {
          const addressParts = permission.resourceGroupRef.split('_');
          const unitId = addressParts[3];
          deviceUnitIds.push(unitId);
        }
      });
    });
    const intersectingIds = _.intersection(allowedUnitIds, deviceUnitIds);
    return !!_.size(intersectingIds);
  });
  const filteredDetails = _.filter(filteredDeviceDetails, deviceDetail => {
    const rights = _.compact(_.map(RESOURCE_SCOPES, scope => (
      _.size(_.get(deviceDetail, scope)) ? scope : null
    )));
    const isPeekOnly = rights.length === 1 && rights[0] === RESOURCE_SCOPES.peek;
    return !isPeekOnly;
  });
  const subUnits = _.get(unit, 'children', []);
  const metaData = {
    [UNIT_TAB_ITEMS.summary]: undefined,
    [UNIT_TAB_ITEMS.members]: `${unitMembers.length}`,
    [UNIT_TAB_ITEMS.subunits]: `${subUnits.length}`,
    [UNIT_TAB_ITEMS.devices]: `${filteredDetails.length}`,
  };
  const tabItems = _.map(TAB_ITEMS_DATA, data => ({
    ...data,
    meta: metaData[data.tabId],
  }));
  return (
    <TabBar
      tabItems={tabItems}
      setActiveTab={async (tabId: string) => props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/${tabId}`)}
      activeTab={props.tabId}
    />
  );
};

export default UnitTabBar;
