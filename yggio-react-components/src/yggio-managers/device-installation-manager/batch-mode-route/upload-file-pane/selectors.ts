/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {createSelector} from 'reselect';
import _ from 'lodash';

import {LORA_CONNECTOR_TYPES} from '../../constants';
import {CommandData} from './types';

const selectConnectorItems = createSelector(
  (props: {commandData: CommandData}) => props.commandData,
  (props: {connectorName?: string}) => props.connectorName,
  (commandData, connectorName) => {
    if (!commandData) return null;
    if (connectorName === LORA_CONNECTOR_TYPES.Netmore) {
      return {
        title: 'Price models',
        items: _.map(commandData, command => ({name: command.name, value: command.compositeCode})),
      };
    }
    if (connectorName === LORA_CONNECTOR_TYPES.ActilityThingpark) {
      return {
        title: 'Connectivity plans',
        items: _.map(commandData, command => ({name: command.name, value: command.id})),
      };
    }
  }
);

export {
  selectConnectorItems,
};
