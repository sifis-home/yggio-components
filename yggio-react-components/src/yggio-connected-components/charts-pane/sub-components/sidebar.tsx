/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';

import {Sidebar as SidebarComponent} from '../../../components/sidebar-components';
import Select from '../../../components/select';
import {AddedDevice, Field, AvailableFields} from '../types';
import {InputOptions} from '../../../types';
import {SIDEBAR_SIBLING_MAX_WIDTH} from '../constants';
import {onAddDevice, onRemoveDevice} from '../events';
import {
  SidebarSection,
  SidebarTitle,
  ListEntry,
  ListEntryTitle,
  RemoveButton
} from '../styled';

interface Props {
  addedDevices: AddedDevice[];
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
  addDeviceOptions: InputOptions;
  availableFields: AvailableFields;
  fieldOptions: InputOptions;
}

const Sidebar = (props: Props) => {
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
        <Select
          placeholder={'Add device...'}
          options={props.addDeviceOptions}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
            const id = evt.target.value;
            onAddDevice(props.addedDevices, id, props.localState.forceStateUpdate);
          }}
          value={null}
          margin={'0 0 10px 0'}
        />
        {_.map(props.addedDevices, device => (
          <ListEntry key={device.id}>
            <ListEntryTitle>{device.name}</ListEntryTitle>
            <RemoveButton
              onClick={() => {
                onRemoveDevice(
                  props.addedDevices,
                  device.id,
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
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => (
              props.localState.addField(evt.target.value)
            )}
            value={null}
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
