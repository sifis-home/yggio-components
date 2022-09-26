/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import fp from 'lodash/fp';
import {Icon} from 'react-icons-kit';
import {statsBars as barChartIcon} from 'react-icons-kit/icomoon/statsBars'

import {
  StyledCloseButton,
  StyledDevicePopup,
  StyledDevicePopupDeviceItemIcon,
  StyledDevicePopupDeviceItemName,
  StyledDevicePopupDeviceItemValue,
  StyledDevicePopupDeviceList,
  StyledDevicePopupDeviceListItem,
  StyledViewAllButton
} from '../styled';
import Button from '../../../../components/button';
import {FlexMaxWidthCenterWrapper} from '../../../../global/styled';

const getValueDisplayMeasurement = (measurement, valueDisplay) => (
  fp.eq(measurement.type, valueDisplay) ? '' : measurement.type
);

const Popup = props => (
  <StyledDevicePopup {...props}>
    <FlexMaxWidthCenterWrapper>
      <b title={_.get(props, `devices.${props.deviceItem.deviceId}.name`)}>
        {fp.truncate({length: 50}, _.get(props.devices, `${props.deviceItem.deviceId}.name`))}
      </b>
    </FlexMaxWidthCenterWrapper>
     {props.values ? (
      <div>
        <StyledDevicePopupDeviceList>
          {fp.map(props.values, (measurement, index) =>
            fp.gt(index, 4) ? null : (
              <StyledDevicePopupDeviceListItem>
                <StyledDevicePopupDeviceItemName title={measurement.name}>
                  {measurement.name}
                </StyledDevicePopupDeviceItemName>
                <StyledDevicePopupDeviceItemValue title={`${measurement.value} ${measurement.unit}`}>
                  {`${measurement.value} ${measurement.unit}`}
                </StyledDevicePopupDeviceItemValue>
                <StyledDevicePopupDeviceItemIcon>
                  <Icon
                    size={18}
                    icon={eye}
                    onClick={() => props.showValueDisplay(
                    props.currentLayer,
                      props.deviceItem._id,
                      getValueDisplayMeasurement(measurement, props.deviceItem.valueDisplay)
                    )}
                    {...(measurement.type === props.deviceItem.valueDisplay ? {className: 'checked_eye'} : {className: 'unchecked_eye'})}
                  />
                </StyledDevicePopupDeviceItemIcon>
              </StyledDevicePopupDeviceListItem>
            ))}
        </StyledDevicePopupDeviceList>
        {fp.gt(props.values.length, 5) ?
          <StyledViewAllButton
            onClick={() => {
              props.toggleLayerMenu(true);
              props.setBlueprintShowsDevices(props.currentLayerId, true);
              props.expandDevice(props.deviceItem._id);
            }}>
            View all values..
          </StyledViewAllButton> :
          null
        }
        <Button color="primary" onClick={() => props.router.push(`/charts/${props.deviceItem.deviceId}`)}>
          <Icon size={20} className="chartIcon" icon={barChartIcon}/>
          Chart
        </Button>{' '}
      </div>
    ) : (
      <FlexMaxWidthCenterWrapper>
        <i>No values available</i>
      </FlexMaxWidthCenterWrapper>
    )}
    <StyledCloseButton onClick={() => props.closeDevicePopup()}>✕</StyledCloseButton>
  </StyledDevicePopup>
);

export default Popup;
