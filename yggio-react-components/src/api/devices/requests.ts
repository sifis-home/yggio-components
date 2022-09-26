/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {request, requestHeaders, requestBodyAndHeaders} from '../request';

import {
  RESOURCE_TYPES,
  HTTP_METHODS,
} from '../../constants';
import {
  Device,
  Devices,
  DeviceIdProps,
  DeviceCommand,
  DeviceCreateData,
  DeviceModelName,
  Job,
} from '../../types';

interface FetchProps {
  lastItemOnPage: string;
  limit: number;
  offset: number;
  orderBy: string;
  filter: object;
}

const fetch = async (
  {
    lastItemOnPage,
    limit,
    offset,
    orderBy = 'name',
    filter,
  }: Partial<FetchProps>
) => request<Devices>({
  method: 'get',
  URI: RESOURCE_TYPES.iotnodes,
  params: {
    lastItemOnPage,
    limit,
    offset,
    orderBy,
    ...filter,
    options: 'count',
  },
});

const fetchBodyAndHeaders = async (
  {
    lastItemOnPage,
    limit,
    offset,
    orderBy = 'name',
    filter,
  }: Partial<FetchProps>
) => requestBodyAndHeaders<Devices>({
  method: 'get',
  URI: RESOURCE_TYPES.iotnodes,
  params: {
    lastItemOnPage,
    limit,
    offset,
    orderBy,
    ...filter,
    options: 'count',
  },
});

const fetchHeaders = async ({offset, limit}: Partial<FetchProps>) => requestHeaders<Devices>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}`,
  params: {
    limit,
    offset,
    options: 'count',
  },
});

const fetchOne = async ({deviceId}: DeviceIdProps) => request<Device>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}`,
});

const peek = async ({filter}: Partial<FetchProps>) => request<Devices>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/peek`,
  params: {
    ...filter,
  },
});

interface SeekProps {
  deviceItems: string[];
}

const seek = async ({deviceItems}: SeekProps) => request<Devices>({
  method: HTTP_METHODS.Put,
  URI: `${RESOURCE_TYPES.iotnodes}/seek`,
  data: deviceItems,
});


const create = async (template: DeviceCreateData) => request<Device>({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.iotnodes}`,
  data: template,
});

const batchCreate = async (template: Record<string, string>[]) => request<Job>({
  method: HTTP_METHODS.Post,
  URI: `${RESOURCE_TYPES.iotnodes}/batch`,
  data: template,
});

interface UpdateProps extends DeviceIdProps {
  updates: Partial<Device>;
}

const update = async ({deviceId, updates}: UpdateProps) => request<UpdateProps>({
  method: HTTP_METHODS.Put,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}`,
  data: updates,
});

const remove = async ({deviceId}: DeviceIdProps) => request<DeviceIdProps>({
  method: HTTP_METHODS.Delete,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}`,
});

const removeMany = async (deviceIds: string[]) => {
  const removeMany = _.map(deviceIds, async id => (
    request({
      method: HTTP_METHODS.Delete,
      URI: `${RESOURCE_TYPES.iotnodes}/${id}`,
    })
  ));
  await Promise.all(removeMany);
};

const sendCommand = async <R>(data: DeviceCommand) => request<R>({
  method: HTTP_METHODS.Put,
  URI: `${RESOURCE_TYPES.iotnodes}/command`,
  data,
});

const getModelNames = async () => request<DeviceModelName[]>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/models`,
});

interface DataPoint {
  time: string;
  value: number;
}

type Data = DataPoint[];

const getStatistics = async (
  deviceId: string,
  measurement: string,
  start: number,
  end: number,
  distance: number | null,
) => request<Data>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/stats`,
  params: {measurement, start, end, distance},
});

const getStatisticsFields = async (deviceId: string) => request<string[]>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/stats/fields`,
});

interface RealEstateCoreData {
  _id: string;
  deviceId: string;
  iotnode: string;
  isMountedInBuildingComponent: {'@id': string};
  observations: object;
  sensors: object;
}

const getRealEstateCoreData = async (deviceId: string) => request<RealEstateCoreData>({
  method: HTTP_METHODS.Get,
  URI: `${RESOURCE_TYPES.iotnodes}/${deviceId}/real-estate-core`,
});

export {
  fetch,
  fetchBodyAndHeaders,
  fetchHeaders,
  create,
  batchCreate,
  peek,
  seek,
  fetchOne,
  update,
  remove,
  removeMany,
  sendCommand,
  getModelNames,
  getStatistics,
  getStatisticsFields,
  getRealEstateCoreData,
};
