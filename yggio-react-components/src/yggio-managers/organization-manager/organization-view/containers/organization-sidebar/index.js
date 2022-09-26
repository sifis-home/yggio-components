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
import {memoizedInputsChecker} from '../../../../../utils';
import {
  withReselect,
  withEffect, withPersistentState,
} from '../../../../../hocs';
import {
  withYggio,
} from '../../../../../yggio-context';

import {BasicTreeView, state as toggleStateRedux} from '../../../../../components/tree-view';
import Button from '../../../../../components/button';

import {
  Sidebar,
  TopSection,
  TopSectionHeadingContainer,
  TopSectionButtonsContainer,
  TreeViewNote,
} from './styled';

// /////
// BasicOrganizationSidebar - uses only fully processed data
// /////

const BasicOrganizationSidebar = props => {
  return (
    <Sidebar>

      <TopSection>
        <TopSectionHeadingContainer>
          <p>{'Selected organization:'}</p>
          <h1>{_.get(props.organization, 'name', 'Organization not found')}</h1>
        </TopSectionHeadingContainer>
        <TopSectionButtonsContainer>
          <Button
            content={'Manage organization'}
            onClick={() => props.router.push(`/organizations/${props.orgId}/summary`)}
            ghosted
            width="160px"
          />
          <Button
            content={'Switch organization'}
            onClick={() => props.router.push('/organizations')}
            ghosted
            width="160px"
          />
        </TopSectionButtonsContainer>
      </TopSection>

      <TreeViewNote>{'Select a subunit to manage:'}</TreeViewNote>
      <BasicTreeView
        toggleState={props.toggleState}
        setToggleState={props.setToggleState}
        treeData={_.get(props.organization, 'rootUnit', {})}
        selectedNodeId={props.unitId}
        onNodeSelected={unitId => {
          props.router.push(`/organizations/${props.orgId}/units/${unitId}/summary`);
        }}
      />

    </Sidebar>
  );
};


BasicOrganizationSidebar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string, // can be null
  // from reselect
  organization: PropTypes.object, // can be null
  // from persistentState
  toggleState: PropTypes.any, // should be more specific....
  setToggleState: PropTypes.func.isRequired,
};

// ////
// RawOrganizationSidebar - data processing layers
// /////

// all the reselectors needed for display & effects

const organizationSelector = createSelector(
  props => props.orgId,
  props => props.organizations,
  (orgId, organizations) => {
    return _.get(organizations, orgId) || null;
  },
);

const deviceSeekerItemsSelector = createSelector(
  props => props.devices,
  props => props.deviceDetails,
  (devices, deviceDetails) => {
    const deviceSeekerItems = _.map(deviceDetails, deviceDetail => {
      const device = devices[deviceDetail.resourceId];
      if (!device) {
        const deviceId = deviceDetail.resourceId;
        return deviceId;
      }
      return null;
    });
    return _.compact(deviceSeekerItems);
  },
);

// the reselected data that gets passed on down the line

const reselectors = {
  organization: organizationSelector,
};

// the effects that initialize data (with memoization checks)

const isSameOrg = memoizedInputsChecker();
const refreshOrgEffect = async props => {
  const needsUpdate = props.orgId && !isSameOrg(props.orgId);
  if (needsUpdate) {
    try {
      await props.getOrganization({orgId: props.orgId});
    } catch (err) {
      // do nothing?
    }
  }
};

const isSameOrg2 = memoizedInputsChecker();
const refreshMembersEffect = async props => {
  const needsUpdate = props.orgId && !isSameOrg2(props.orgId);
  if (needsUpdate) {
    try {
      await props.fetchMembers({orgId: props.orgId});
    } catch (err) {
      // do nothing?
    }
  }
};

const isSameDeviceDetails = memoizedInputsChecker();
const refreshDeviceDetailsEffect = async props => {
  const needsUpdate = props.orgId && !isSameDeviceDetails(props.orgId);
  if (needsUpdate) {
    try {
      await props.fetchDeviceDetails({orgId: props.orgId});
    } catch (err) {
      // do nothing?
    }
  }
};

const isSameDevices = memoizedInputsChecker(_.isEqual);
const refreshDevicesEffect = async props => {
  const deviceSeekerItems = deviceSeekerItemsSelector(props);
  const needsUpdate = _.size(deviceSeekerItems) && !isSameDevices(deviceSeekerItems);
  if (needsUpdate) {
    try {
      await props.fetchDevices();
      // await props.seekDevices({deviceItems: deviceSeekerItems});
    } catch (err) {
      // do nothing?
    }
  }
};

const RawOrganizationSidebar = compose(
  withPersistentState(toggleStateRedux, 'org-toggle-state'),
  withReselect(reselectors),
  withEffect(refreshOrgEffect),
  withEffect(refreshMembersEffect),
  withEffect(refreshDeviceDetailsEffect),
  withEffect(refreshDevicesEffect),
)(BasicOrganizationSidebar);

RawOrganizationSidebar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string, // can be null
  // from yggio
  organizations: PropTypes.object.isRequired,
  deviceDetails: PropTypes.object.isRequired,
  devices: PropTypes.object.isRequired,
  getOrganization: PropTypes.func.isRequired,
  fetchMembers: PropTypes.func.isRequired,
  fetchDeviceDetails: PropTypes.func.isRequired,
  fetchDevices: PropTypes.func.isRequired,
  // seekDevices: PropTypes.func.isRequired,
};


// /////
// OrganizationSidebar - fully yggio connected
// /////

// the yggio data hookup
const yggio = {
  mapYggioStateToProps: yggioState => {
    // console.log('OrganizationSidebar', {yggioState});
    return {
      organizations: yggioState.database.organizations,
      deviceDetails: yggioState.database.deviceDetails,
      devices: yggioState.database.devices,
    };
  },

  mapYggioActionsToProps: yggioActions => ({
    // from orgs
    getOrganization: yggioActions.database.organizations.getOrganization,
    fetchMembers: yggioActions.database.organizations.fetchMembers,
    fetchDeviceDetails: yggioActions.database.organizations.fetchDeviceDetails,
    // from devices
    // seekDevices: yggioActions.database.devices.seekDevices,
    fetchDevices: yggioActions.database.devices.fetchDevices,
  }),
};

const OrganizationSidebar = compose(
  withYggio(yggio),
)(RawOrganizationSidebar);

OrganizationSidebar.propTypes = {
  // from top
  router: PropTypes.object.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string, // can be null
};

// /////
// exports
// /////


export default OrganizationSidebar;
export {
  RawOrganizationSidebar,
};
