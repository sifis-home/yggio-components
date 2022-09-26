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

// /////
// deconstruction &  constants
// /////
const ORG_TAB_ITEMS = {
  summary: 'summary',
  members: 'members',
  devices: 'devices',
};
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
];

// /////
// The BasicOrganizationTabBar - uses only fully processed data
// /////

const BasicOrganizationTabBar = props => {
  return (
    <TabBar
      tabItems={props.tabItems}
      setActiveTab={tabId => props.router.push(`/organizations/${props.orgId}/${tabId}`)}
      activeTab={props.tabId}
    />
  );
};
BasicOrganizationTabBar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOf(_.values({...ORG_TAB_ITEMS, createMember: 'createMember'})),
  // from reselect
  tabItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    tabId: PropTypes.string.isRequired,
    meta: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
};


// /////
// Data processing layers
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


const deviceDetailsSelector = createSelector(
  props => props.deviceDetails,
  deviceDetails => {
    const filteredDetails = _.filter(deviceDetails, deviceDetail => {
      const rights = _.compact(_.map(RESOURCE_SCOPES, scope => (_.size(_.get(deviceDetail, `access.${scope}`)) ? scope : null)));
      const isPeekOnly = rights.length === 1 && rights[0] === RESOURCE_SCOPES.peek;
      return !isPeekOnly;
    });
    return filteredDetails;
  },
);


// custom fit
const tabItemsSelector = createSelector(
  organizationSelector,
  deviceDetailsSelector,
  (organization, deviceDetails) => {
    const numMembers = _.size(_.get(organization, 'members'));
    const numDevices = _.size(deviceDetails);
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

const primarySelectors = {
  tabItems: tabItemsSelector,
};

// ////
// RawOrganizationTabBar - disconnected from yggio
// ////

const RawOrganizationTabBar = compose(
  withReselect(primarySelectors),
)(BasicOrganizationTabBar);

RawOrganizationTabBar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOf(_.values({...ORG_TAB_ITEMS, createMember: 'createMember'})),
  // from yggio
  organizations: PropTypes.object,
};


// /////
// The OrganizationTabBar that is exposed
// /////

// the yggio data hookup
const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
    deviceDetails: yggioState.database.deviceDetails,
  }),
};


const OrganizationTabBar = compose(
  withYggio(yggio),
)(RawOrganizationTabBar);

OrganizationTabBar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  tabId: PropTypes.oneOf(_.values({...ORG_TAB_ITEMS, createMember: 'createMember'})),
};

// /////
// exports
// /////

export default OrganizationTabBar;
export {
  BasicOrganizationTabBar,
  RawOrganizationTabBar,
};
