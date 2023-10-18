import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';

import {RESOURCE_SCOPES} from '../../../../constants';
import {organizationUtils} from '../../../../utils';

import {
  DevicesListContainer,
  DeviceTable,
  HeaderCell,
  TableCell,
} from './styled';

import {
  AccessSourceCell,
} from './sub-components';
import {organizationsApi, devicesApi} from '../../../../api';
import {DeviceDetail, Organization} from '../../../../types';
import {SourceInfo} from './types';

interface OrganizationDevicesProps {
  orgId: string;
  router: NextRouter;
}

// utility
const extractAccessSourceInfo = (
  deviceDetail: DeviceDetail,
  organization?: Organization,
) => {
  if (!organization) {
    return null;
  }
  const accessSourceInfo = _.reduce(RESOURCE_SCOPES, (acc, curr) => {
    const permissions = deviceDetail[curr] || [];
    _.each(permissions, permission => {
      if (permission.resourceGroupType === 'orgUnit') {
        const addressParts = permission.resourceGroupRef.split('_');
        const unitId = addressParts[3];
        const unit = organizationUtils.findUnit(organization, unitId);
        if (unit) {
          acc[permission.resourceGroupType] = {
            unitId,
            unitName: unit.name || `unitId <${unitId}> not found`,
          };
        }
      } else {
        // @ts-ignore - don't know how to fix this
        acc[permission.resourceGroupType] = true;
      }
    });
    return acc;
  }, {} as SourceInfo);
  return accessSourceInfo;
};

const OrganizationDevicesPane = (props: OrganizationDevicesProps) => {
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const deviceDetailsQuery = organizationsApi.useOrganizationsDeviceQuery({orgId: props.orgId});
  const deviceIds = _.map(deviceDetailsQuery.data?.deviceDetails, detail => detail.resourceId);
  const seekDevicesQuery = devicesApi.useSeekDevicesQuery({
    params: {deviceItems: _.compact(deviceIds)},
  });

  const filteredDetails = _.filter(deviceDetailsQuery.data?.deviceDetails, deviceDetail => {
    const rights = _.compact(_.map(RESOURCE_SCOPES, scope => (
      _.size(_.get(deviceDetail, scope)) ? scope : null
    )));
    const isPeekOnly = rights.length === 1 && rights[0] === RESOURCE_SCOPES.peek;
    return !isPeekOnly;
  });

  const deviceItems = _.compact(_.map(filteredDetails, deviceDetail => {
    const device = _.find(seekDevicesQuery.data, device => device._id === deviceDetail.resourceId);
    if (!device) {
      return null;
    }
    const deviceItem = {
      deviceId: deviceDetail.resourceId,
      rights: _.compact(_.map(RESOURCE_SCOPES, scope => (
        _.size(_.get(deviceDetail, scope)) ? scope : null
      ))),
      deviceName: _.get(device, 'name', `<${deviceDetail.resourceId}>`),
      sourceInfo: extractAccessSourceInfo(deviceDetail, organizationQuery.data),
    };
    return deviceItem;
  }));

  return (
    <DevicesListContainer>

      {(deviceItems.length === 0) && (
        <p>{'No devices available'}</p>
      )}

      {(deviceItems.length !== 0) && (
        <DeviceTable>
          <HeaderCell>{'Device name'}</HeaderCell>
          <HeaderCell>{'Access rights'}</HeaderCell>
          <HeaderCell>{'Access source'}</HeaderCell>

          {_.map(deviceItems, deviceItem => (
            <React.Fragment key={deviceItem.deviceId}>
              <TableCell>{deviceItem.deviceName}</TableCell>
              <TableCell>{deviceItem.rights.join(', ')}</TableCell>
              <AccessSourceCell
                router={props.router}
                orgId={props.orgId}
                sourceInfo={deviceItem.sourceInfo!}
              />
            </React.Fragment>
          ))}

        </DeviceTable>
      )}

    </DevicesListContainer>
  );
};

export default OrganizationDevicesPane;
