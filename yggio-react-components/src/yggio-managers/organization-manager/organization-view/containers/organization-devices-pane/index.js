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

import {RESOURCE_SCOPES} from '../../../../../constants';
import {organizationUtils} from '../../../../../utils';

import {
  DevicesListContainer,
  DeviceTable,
  HeaderCell,
  TableCell,
} from './styled';

import {
  AccessSourceCell,
} from './sub-components';

// /////
// BasicOrganizationDevicesPane - uses only fully processed data
// /////

const BasicOrganizationDevicesPane = props => (
  <DevicesListContainer>

    {(props.deviceItems.length === 0) && (
      <p>{'No devices available'}</p>
    )}

    {(props.deviceItems.length !== 0) && (
      <DeviceTable>
        <HeaderCell>{'Device name'}</HeaderCell>
        <HeaderCell>{'Access rights'}</HeaderCell>
        <HeaderCell>{'Access source'}</HeaderCell>

        {_.map(props.deviceItems, deviceItem => (
          <React.Fragment key={deviceItem.deviceId}>
            <TableCell>{deviceItem.deviceName}</TableCell>
            <TableCell>{deviceItem.rights.join(', ')}</TableCell>
            <AccessSourceCell
              router={props.router}
              orgId={props.orgId}
              onUnitSelected={props.onUnitSelected}
              sourceInfo={deviceItem.sourceInfo}
            />
          </React.Fragment>
        ))}

      </DeviceTable>
    )}

  </DevicesListContainer>
);


BasicOrganizationDevicesPane.propTypes = {
  // from top
  router: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
  // from reselect
  deviceItems: PropTypes.arrayOf(PropTypes.shape({
    deviceId: PropTypes.string.isRequired,
    rights: PropTypes.arrayOf(PropTypes.string),
    deviceName: PropTypes.string.isRequired,
    sourceInfo: PropTypes.any,
  })),
};


// ////
// RawOrganizationDevicesPane - data processing
// ////

// extract organization
const organizationSelector = createSelector(
  props => props.organizations,
  props => props.orgId,
  (organizations, orgId) => {
    const organization = _.get(organizations, orgId);
    return organization;
  },
);

// removes peek-only device details
const filteredDeviceDetailsSelector = createSelector(
  props => props.deviceDetails,
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

// utility
const extractAccessSourceInfo = (deviceDetail, organization) => {
  const sourceInfo = {};
  _.each(RESOURCE_SCOPES, scope => {
    const permissions = deviceDetail[scope] || [];
    _.each(permissions, permission => {
      if (permission.resourceGroupType === 'orgUnit') {
        const addressParts = permission.resourceGroupRef.split('_');
        const unitId = addressParts[3];
        const unit = organizationUtils.findUnit(organization, unitId) || {};
        sourceInfo[permission.resourceGroupType] = {
          unitId,
          unitName: unit.name || `unitId <${unitId}> not found`,
        };
      } else {
        sourceInfo[permission.resourceGroupType] = true;
      }
    });
  });
  return sourceInfo;
};

const deviceItemsSelector = createSelector(
  props => props.devices,
  filteredDeviceDetailsSelector,
  organizationSelector,
  (devices, deviceDetails, organization) => {
    const deviceItems = _.map(deviceDetails, deviceDetail => {
      const device = devices[deviceDetail.resourceId];
      const deviceItem = {
        deviceId: deviceDetail.resourceId,
        rights: _.compact(_.map(RESOURCE_SCOPES, scope => (
          _.size(_.get(deviceDetail, scope)) ? scope : null
        ))),
        deviceName: _.get(device, 'name', `<${deviceDetail.resourceId}>`),
        sourceInfo: extractAccessSourceInfo(deviceDetail, organization),
      };
      return deviceItem;
    });
    return deviceItems;
  },
);

const reselectors = {
  deviceItems: deviceItemsSelector,
};

const RawOrganizationDevicesPane = compose(
  withReselect(reselectors),
)(BasicOrganizationDevicesPane);

RawOrganizationDevicesPane.propTypes = {
  // from top
  router: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
  // from yggio
  organizations: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  devices: PropTypes.object.isRequired,
  deviceDetails: PropTypes.object.isRequired,
};


// /////
// OrganizationDevicesPane - fully yggio connected
// /////


const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
    users: yggioState.database.users,
    devices: yggioState.database.devices,
    deviceDetails: yggioState.database.deviceDetails,
  }),
};

const OrganizationDevicesPane = compose(
  withYggio(yggio),
)(RawOrganizationDevicesPane);

OrganizationDevicesPane.propTypes = {
  // from top
  router: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
};


// /////
// exports
// /////

export default OrganizationDevicesPane;
export {
  BasicOrganizationDevicesPane,
  RawOrganizationDevicesPane,
};
