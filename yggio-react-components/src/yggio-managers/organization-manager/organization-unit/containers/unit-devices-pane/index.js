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

import {
  DevicesListContainer,
  DeviceTable,
  HeadingCell,
  TableCell,
} from './styled';

import {
  AccessSourceCell,
} from './sub-components';

import {organizationUtils} from '../../../../../utils';

// /////
// BasicUnitDevicesPane - uses only fully processed data
// /////

const BasicUnitDevicesPane = props => (
  <DevicesListContainer>

    {!props.deviceItems.length && (
      <p>{'No devices available'}</p>
    )}

    {!!props.deviceItems.length && (
      <DeviceTable>

        <HeadingCell>{'Device name'}</HeadingCell>
        <HeadingCell>{'Access rights'}</HeadingCell>
        <HeadingCell>{'Source (includes subunits)'}</HeadingCell>

        {_.map(props.deviceItems, deviceItem => (
          <React.Fragment key={deviceItem.deviceId}>
            <TableCell>{deviceItem.deviceName}</TableCell>
            <TableCell>{deviceItem.rights.join(', ')}</TableCell>
            <AccessSourceCell
              router={props.router}
              orgId={props.orgId}
              onUnitSelected={props.onUnitSelected}
              deviceItem={deviceItem}
            />
          </React.Fragment>
        ))}

      </DeviceTable>
    )}

  </DevicesListContainer>
);

BasicUnitDevicesPane.propTypes = {
  // from top
  router: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
  // from reselect
  deviceItems: PropTypes.arrayOf(PropTypes.shape({
    deviceId: PropTypes.string.isRequired,
    deviceName: PropTypes.string.isRequired,
    rights: PropTypes.arrayOf(PropTypes.string).isRequired,
    unitId: PropTypes.string.isRequired,
    unitName: PropTypes.string,
  })).isRequired,
};

// /////
// Data processing layers & local state
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
      const rights = _.compact(
        _.map(RESOURCE_SCOPES, scope => _.size(_.get(deviceDetail, scope)) ? scope : null)
      );
      const isPeekOnly = rights.length === 1 && rights[0] === RESOURCE_SCOPES.peek;
      return !isPeekOnly;
    });
    return filteredDetails;
  },
);


const deviceItemsSelector = createSelector(
  props => props.devices,
  filteredDeviceDetailsSelector,
  subunitsSelector,
  (devices, deviceDetails, subunits) => {

    const deviceItems = _.map(deviceDetails, deviceDetail => {

      // fill up unitIds (dirty doing this again..)
      const unitIds = []; // gets mutated
      _.each(RESOURCE_SCOPES, scope => {
        const permissions = deviceDetail[scope] || [];
        _.each(permissions, permission => {
          if (permission.resourceGroupType === 'orgUnit') {
            const addressParts = permission.resourceGroupRef.split('_');
            const unitId = addressParts[3];
            unitIds.push(unitId);
          }
        });
      });

      // there can really only be one, and it has already been filtered
      const deviceUnitId = unitIds.pop();
      const deviceUnit = _.find(subunits, unit => unit._id === deviceUnitId);
      // and
      const device = devices[deviceDetail.resourceId];
      const deviceItem = {
        deviceId: deviceDetail.resourceId,
        rights: _.compact(
          _.map(RESOURCE_SCOPES, scope => _.size(_.get(deviceDetail, scope)) ? scope : null)
        ),
        deviceName: _.get(device, 'name', `<${deviceDetail.resourceId}>`),
        unitId: deviceUnitId,
        unitName: _.get(deviceUnit, 'name', `missing unit <${deviceUnitId}>`),
      };
      return deviceItem;
    });
    return deviceItems;
  },
);


const reselectors = {
  deviceItems: deviceItemsSelector,
};

// ////
// RawUnitDevicesPane - disconnected from yggio
// ////

const RawUnitDevicesPane = compose(
  withReselect(reselectors),
)(BasicUnitDevicesPane);

RawUnitDevicesPane.propTypes = {
  // from top
  router: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
  // from yggio
  organizations: PropTypes.object,
  users: PropTypes.object,
  devices: PropTypes.object,
  deviceDetails: PropTypes.object,
};

// /////
// UnitDevicesPane - fully yggio connected
// /////

const yggio = {
  mapYggioStateToProps: yggioState => ({
    organizations: yggioState.database.organizations,
    users: yggioState.database.users,
    devices: yggioState.database.devices,
    deviceDetails: yggioState.database.deviceDetails,
  }),
};

const UnitDevicesPane = compose(
  withYggio(yggio),
)(RawUnitDevicesPane);

UnitDevicesPane.propTypes = {
  // from top
  router: PropTypes.any.isRequired,
  orgId: PropTypes.string.isRequired,
  unitId: PropTypes.string.isRequired,
};

// /////
// exports
// /////

export default UnitDevicesPane;
export {
  BasicUnitDevicesPane,
  RawUnitDevicesPane,
};
