/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import {useQuery} from '@tanstack/react-query';

import {devicesApi, devicesRequests} from '../../../../api';
import {selectLoraConnectors} from './selectors';
import {NetmorePriceModel, ActilityThingParkConnectivityPlan} from '../../../../types';
import {ConnectorInputValue} from '../types';
import {LORA_CONNECTOR_TYPES} from '../../constants';

const useFetchConnectorDevicesQuery = () => {
  const devices = devicesApi.useConnectorsDevicesQuery();
  const loraConnectors = selectLoraConnectors({devices});
  return loraConnectors;
};

const useFetchPriceModelsQuery = (connector: ConnectorInputValue) => (
  useQuery(
    ['devices', 'deviceCommands', 'priceModels'],
    async () => devicesRequests.sendCommand<NetmorePriceModel[]>({
      command: 'apiCall',
      iotnodeId: connector.deviceId,
      data: {
        callName: 'fetchPriceModels',
      },
    }),
    {
      enabled: connector.type === LORA_CONNECTOR_TYPES.Netmore,
    }
  )
);

const useFetchConnectivityPlansQuery = (connector: ConnectorInputValue) => (
  useQuery(
    ['devices', 'deviceCommands', 'connectivityPlans'],
    async () => devicesRequests.sendCommand<ActilityThingParkConnectivityPlan[]>({
      command: 'apiCall',
      iotnodeId: connector.deviceId,
      data: {
        callName: 'fetchConnectivityPlans',
      },
    }),
    {
      enabled: connector.type === LORA_CONNECTOR_TYPES.ActilityThingpark,
    }
  )
);

export {
  useFetchConnectorDevicesQuery,
  useFetchPriceModelsQuery,
  useFetchConnectivityPlansQuery,
};
