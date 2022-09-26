/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import {compose} from 'lodash/fp';
import {createSelector} from 'reselect';
import {withReselect} from '../../../../../hocs';
import {withYggio} from '../../../../../yggio-context';
import {
  RESOURCE_SCOPES,
} from '../../../../../constants';

import TabBar from '../../../../../components/tab-bar';
import {organizationUtils} from '../../../../../utils';


// /////
// deconstruction & constants
// /////


const UNIT_TAB_ITEMS = {
  summary: 'summary',
  members: 'members',
  subunits: 'subunits',
  devices: 'devices',
};

const TAB_PROP_TYPES = {
  ...UNIT_TAB_ITEMS,
  edit: 'edit',
  addSubunit: 'addSubunit',
  createMember: 'createMember',
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

// /////
// The BasicUnitTabBar - uses only fully processed data
// /////

const BasicUnitTabBar = props => {
  return (
    <TabBar
      tabItems={props.tabItems}
      setActiveTab={tabId => props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/${tabId}`)}
      activeTab={props.tabId}
    />
  );
};
BasicUnitTabBar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOf(_.values(TAB_PROP_TYPES)).isRequired,
  // from reselect
  tabItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    tabId: PropTypes.string.isRequired,
    meta: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })).isRequired,
};

// ////
// RawUnitTabBar - data processing layers
// /////

// extract organization
const organizationSelector = createSelector(
  props => props.organizations,
  props => props.orgId,
  (organizations, orgId) => {
    const organization = _.get(organizations, orgId);
    return organization;
  },
);

// extract all members
const membersSelector = createSelector(
  organizationSelector,
  props => props.users,
  (organization, users) => {
    const memberIds = _.get(organization, 'members', []);
    const members = _.map(memberIds, memberId => users[memberId]);
    return _.compact(members);
  },
);

// filter for unit
const unitSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    const unit = organizationUtils.findUnit(organization, unitId);
    return unit;
  },
);

const subunitsSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    if (!organization) {
      return [];
    }
    const {unit, descendants} = organizationUtils.decomposeUnit(organization, unitId);
    const subunits = _.compact(_.concat(descendants, unit));
    return subunits;
  },
);

// all tokens specific to this unit
const unitTokensSelector = createSelector(
  organizationSelector,
  props => props.unitId,
  (organization, unitId) => {
    const tokens = _.get(organization, 'accessTokens', []);
    const unitTokens = _.filter(tokens, {unitId});
    return unitTokens;
  },
);

// get all unique unit members
const unitMembersSelector = createSelector(
  membersSelector,
  unitTokensSelector,
  (members, tokens) => {
    const unitMemberIds = _.uniq(_.map(tokens, token => token.memberId));
    const unitMembers = _.filter(members, member => _.includes(unitMemberIds, member._id));
    return unitMembers;
  },
);

// get all the deviceDetails that belong to this unit
const unitDeviceDetailsSelector = createSelector(
  unitSelector,
  subunitsSelector,
  props => props.deviceDetails,
  (unit, subunits, deviceDetails) => {
    const allowedUnitIds = _.map(subunits, subunit => subunit._id);
    const filteredDeviceDetails = _.filter(deviceDetails, deviceDetail => {
      const deviceUnitIds = []; // gets mutated
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
    return filteredDeviceDetails;
  },
);

// remove peek-only devices (is this correct? who knows)
const filteredDeviceDetailsSelector = createSelector(
  unitDeviceDetailsSelector,
  deviceDetails => {
    const filteredDetails = _.filter(deviceDetails, deviceDetail => {
      const rights = _.compact(_.map(RESOURCE_SCOPES, scope => (
        _.size(_.get(deviceDetail, scope)) ? scope : null
      )));
      const isPeekOnly = rights.length === 1 && rights[0] === RESOURCE_SCOPES.peek;
      return !isPeekOnly;
    });
    return filteredDetails;
  },
);


const subUnitsSelector = createSelector(
  unitSelector,
  unit => _.get(unit, 'children', []),
);

// generate the tabItems
const tabItemsSelector = createSelector(
  subUnitsSelector,
  unitMembersSelector,
  filteredDeviceDetailsSelector,
  (subUnits, unitMembers, unitDeviceDetails) => {
    const metaData = {
      [UNIT_TAB_ITEMS.summary]: undefined,
      [UNIT_TAB_ITEMS.members]: `${unitMembers.length}`,
      [UNIT_TAB_ITEMS.subunits]: `${subUnits.length}`,
      [UNIT_TAB_ITEMS.devices]: `${unitDeviceDetails.length}`,
    };
    const combined = _.map(TAB_ITEMS_DATA, data => ({
      ...data,
      meta: metaData[data.tabId],
    }));
    return combined;
  },
);

const reselectors = {
  tabItems: tabItemsSelector,
};

// and compose the component

const RawUnitTabBar = compose(
  withReselect(reselectors),
)(BasicUnitTabBar);

RawUnitTabBar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOf(_.values(TAB_PROP_TYPES)).isRequired,
  // from yggio
  organizations: PropTypes.object.isRequired,
};

// /////
// UnitTabBar - fully yggio connected
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    users: yggioState.database.users,
    organizations: yggioState.database.organizations,
    deviceDetails: yggioState.database.deviceDetails,
  }),
};

const UnitTabBar = compose(
  withYggio(yggio),
)(RawUnitTabBar);

UnitTabBar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOf(_.values(TAB_PROP_TYPES)).isRequired,
};

// /////
// exports
// /////

export default UnitTabBar;
export {
  BasicUnitTabBar,
  RawUnitTabBar,
};
