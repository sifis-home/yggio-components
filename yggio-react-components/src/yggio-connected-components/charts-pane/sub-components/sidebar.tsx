/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';

import {devicesApi} from '../../../api';
import {Sidebar as SidebarComponent} from '../../../components/sidebar-components';
import Select from '../../../components/select';
import TextField from '../../../components/text-field';
import {Field, AvailableFields} from '../types';
import {InputOptions, Device} from '../../../types';
import {SIDEBAR_SIBLING_MAX_WIDTH} from '../constants';
import {onAddDevice, onRemoveDevice} from '../events';
import {addDeviceOptionsSelector} from '../selectors';
import {
  SidebarSection,
  SidebarTitle,
  ListEntry,
  ListEntryTitle,
  RemoveButton,
  SearchedDevicesContainer,
  SearchedDevice,
  NoSearcedDevicesBox,
} from '../styled';

interface Props {
  addedDevices: Device[];
  localState: {
    fields: Field[];
    addField: (fieldName: string) => void;
    removeField: (fieldName: string) => void;
    clearFields: () => void;
    forceStateUpdate: () => void;
  },
  sidebarState: {
    isSidebarOpen: boolean;
    closeSidebar: () => void;
    openSidebar: () => void;
  }
  availableFields: AvailableFields;
  fieldOptions: InputOptions;
}

const Sidebar = (props: Props) => {

  const [deviceNameFilter, setDeviceNameFilter] = useState<string>('');

  const devicesQuery = devicesApi.useDevicesQuery({
    params: {filter: {matchPattern: {name: deviceNameFilter}}, limit: 15},
    enabled: !!deviceNameFilter,
  });

  const addDeviceOptions = addDeviceOptionsSelector(props.addedDevices, devicesQuery.data);

  return (
    <SidebarComponent
      isSidebarOpen={props.sidebarState.isSidebarOpen}
      siblingWidth={SIDEBAR_SIBLING_MAX_WIDTH}
      isUsingNavbar
      closeSidebar={props.sidebarState.closeSidebar}
      openSidebar={props.sidebarState.openSidebar}
    >
      <SidebarSection>
        <SidebarTitle>Devices</SidebarTitle>

        <TextField
          placeholder={'Search device'}
          value={deviceNameFilter}
          onChange={evt => setDeviceNameFilter(evt.target.value)}
          margin={'0 0 5px 0'}
        />

        <SearchedDevicesContainer>

          {addDeviceOptions.length === 0 && deviceNameFilter && (
            <NoSearcedDevicesBox>
              <p>No devices found</p>
            </NoSearcedDevicesBox>
          )}

          {addDeviceOptions.length > 0 && (
            <>
              {_.map(addDeviceOptions, device => (
                <SearchedDevice
                  onClick={() => onAddDevice(props.addedDevices, device.value, props.localState.forceStateUpdate, setDeviceNameFilter)}
                >
                  <p title={device.label}>{device.label}</p>
                </SearchedDevice>
              ))}
            </>
          )}

        </SearchedDevicesContainer>

        {_.map(props.addedDevices, device => (
          <ListEntry key={device.id}>
            <ListEntryTitle title={device.name}>{device.name}</ListEntryTitle>
            <RemoveButton
              onClick={() => {
                onRemoveDevice(
                  props.addedDevices,
                  device._id,
                  props.localState.clearFields,
                  props.localState.forceStateUpdate,
                );
              }}
            >x
            </RemoveButton>
          </ListEntry>
        ))}

      </SidebarSection>
      {props.addedDevices.length > 0 && (
        <SidebarSection>
          <SidebarTitle>Fields</SidebarTitle>
          <Select
            placeholder={'Add field...'}
            options={props.fieldOptions}
            onChange={evt => props.localState.addField(evt.target.value)}
            value={undefined}
            margin={'0 0 10px 0'}
          />
          {_.map(props.localState.fields, field => (
            <ListEntry key={field.name}>
              <ListEntryTitle redColor={!props.availableFields[field.name]}>
                {field.name}
                {
                  /*
                    // Maybe show the number of occurences?
                    ({(props.availableFields[field.name] || []).length})
                  */
                }
              </ListEntryTitle>
              <RemoveButton
                onClick={() => props.localState.removeField(field.name)}
              >
                x
              </RemoveButton>
            </ListEntry>
          ))}
        </SidebarSection>
      )}
    </SidebarComponent>
  );
};

export default Sidebar;
