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
