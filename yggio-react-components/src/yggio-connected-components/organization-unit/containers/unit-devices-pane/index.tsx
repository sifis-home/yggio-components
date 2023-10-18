/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';
import {
  DevicesListContainer,
  DeviceTable,
  HeadingCell,
  TableCell,
} from './styled';

import {
  AccessSourceCell,
} from './sub-components';

import {organizationUtils} from '../../../../utils';
import {organizationsApi, devicesApi} from '../../../../api';
import {RESOURCE_SCOPES} from '../../../../constants';


interface UnitDevicesProps {
  orgId: string;
  unitId: string;
  router: NextRouter;
}

const UnitDevicesPane = (props: UnitDevicesProps) => {
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const deviceDetailsQuery = organizationsApi.useOrganizationsDeviceQuery({orgId: props.orgId});

  // eslint-disable-next-line
  const decomposedUnit = organizationUtils.decomposeUnit(organizationQuery.data, props.unitId);
  const subunits = _.compact(_.concat(decomposedUnit?.descendants, decomposedUnit?.unit));

  const deviceIds = _.map(deviceDetailsQuery.data?.deviceDetails, deviceDetail => deviceDetail.resourceId);

  const seekDevicesQuery = devicesApi.useSeekDevicesQuery({params: {deviceItems: deviceIds}});

  // eslint-disable-next-line
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
  const deviceDetails = _.filter(filteredDeviceDetails, deviceDetail => {
    const rights = _.compact(
      _.map(RESOURCE_SCOPES, scope => _.size(_.get(deviceDetail, scope)) ? scope : null)
    );
    const isPeekOnly = rights.length === 1 && rights[0] === RESOURCE_SCOPES.peek;
    return !isPeekOnly;
  });

  const deviceItems = _.map(deviceDetails, deviceDetail => {
    const unitIds: string[] = [];
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
    const device = seekDevicesQuery.data?.[deviceDetail.resourceId];
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


  return (
    <DevicesListContainer>

      {!deviceItems.length && (
        <p>{'No devices available'}</p>
      )}

      {!!deviceItems.length && (
        <DeviceTable>

          <HeadingCell>{'Device name'}</HeadingCell>
          <HeadingCell>{'Access rights'}</HeadingCell>
          <HeadingCell>{'Source (includes subunits)'}</HeadingCell>

          {_.map(deviceItems, deviceItem => (
            <React.Fragment key={deviceItem.deviceId}>
              <TableCell>{deviceItem.deviceName}</TableCell>
              <TableCell>{deviceItem.rights.join(', ')}</TableCell>
              <AccessSourceCell
                router={props.router}
                orgId={props.orgId}
                deviceItem={deviceItem}
              />
            </React.Fragment>
          ))}

        </DeviceTable>
      )}

    </DevicesListContainer>
  );
};

export default UnitDevicesPane;
