/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import _ from 'lodash';
import {useQuery, useMutation, QueryClient} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';

import {devicesRequests} from '.';
import {selectDevicesData} from './selectors';
import {
  Device,
  DeviceCommand,
  FetchDevicesProps,
  SelectorType,
  RealEstateCoreResponse,
  Devices,
} from '../../types';

/*
  Because the usage of WebSockets and real time updates
  we have decided to just set staleTime to Infinity.

  This leads to @tanstack/react-query fetching data once and never
  trying to keep it fresh, because that work now falls
  upon WebSockets.
*/
const defaultOptions = {
  staleTime: Infinity,
  refetchOnWindowFocus: false,
};

const useNumDevicesQuery = () => (
  useQuery(
    ['devices'],
    async () => devicesRequests.fetchHeaders({limit: 1, offset: 0}),
    {
      ...defaultOptions,
      select: headers => headers['fiware-total-count'],
    }
  )
);

interface DevicesQuery {
  params: FetchDevicesProps;
  select: SelectorType;
}

const useDevicesQuery = (props: DevicesQuery) => (
  useQuery(
    ['devices', props.params],
    async () => devicesRequests.fetch(props.params),
    {
      ...defaultOptions,
      keepPreviousData: true,
      select: data => props.select(data),
    }
  )
);

const useDevicesWithNumTotalDevicesQuery = (props: DevicesQuery) => (
  useQuery(
    ['devices', props.params],
    async () => devicesRequests.fetchBodyAndHeaders(props.params),
    {
      ...defaultOptions,
      keepPreviousData: true,
    }
  )
);

const useDevicesPeekQuery = (params: FetchDevicesProps) => (
  useQuery(
    ['devices', 'peek', params],
    async () => devicesRequests.peek(params),
    {
      ...defaultOptions,
    }
  )
);

const useDeviceModelNames = () => (
  useQuery(
    ['deviceModelNames'],
    async () => devicesRequests.getModelNames(),
    {
      ...defaultOptions,
    }
  )
);

const useConnectorsDevicesQuery = () => {
  const params = {
    filter: {
      attributeExists: 'downlinkQueue',
    },
  };
  const devicesQuery = useDevicesQuery({params, select: data => data});
  const devicesPeekQuery = useDevicesPeekQuery(params);
  const union = _.unionBy(devicesQuery.data as Devices, devicesPeekQuery.data as Devices, '_id');
  return union;
};


const useConnectorDevicesQuery = (connector: string) => {
  const params = {
    filter: {
      matchPattern: {downlinkQueue: connector},
    },
  };
  return useDevicesQuery({params, select: data => data});
};

const useDeviceQuery = (props: {deviceId: string}) => (
  useQuery(
    ['device', props.deviceId],
    async () => devicesRequests.fetchOne({deviceId: props.deviceId}),
    {
      ...defaultOptions,
    }
  )
);

interface SeekDevicesQuery {
  params: {deviceItems: string[]};
}

const useSeekDevicesQuery = (props: SeekDevicesQuery) => (
  useQuery(
    ['devices', props.params],
    async () => devicesRequests.seek(props.params),
    {
      ...defaultOptions,
      keepPreviousData: true,
      select: selectDevicesData,
      enabled: !!_.size(props.params.deviceItems)
    }
  )
);

const useStatisticsFieldsQuery = (deviceId: string) => (
  useQuery(
    ['devices', 'statisticsFields', deviceId],
    async () => devicesRequests.getStatisticsFields(deviceId),
    {
      ...defaultOptions,
    }
  )
);

const useCreateDevice = (queryClient: QueryClient) => useMutation(
  async (data: Partial<Device>) => devicesRequests.create(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['devices']);
    }
  }
);

interface UpdateProps {
  deviceId: string;
  updates: Partial<Device>;
}

const useUpdateDevice = (queryClient: QueryClient) => useMutation(
  async ({deviceId, updates}: UpdateProps) => devicesRequests.update({deviceId, updates}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['devices']);
      await queryClient.invalidateQueries(['device']);
    },
    onError: (err: Error) => {
      const {message: errorMessage} = err;
      console.error('Update device error: ', err);
      toast.error(errorMessage, {id: errorMessage});
    },
  }
);

const useRemoveDevice = (queryClient: QueryClient) => useMutation(
  async ({deviceId}: {deviceId: string}) => devicesRequests.remove({deviceId}),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['devices']);
      await queryClient.invalidateQueries(['device']);
    }
  }
);

const useCommandDevice = (queryClient: QueryClient) => useMutation(
  async (data: DeviceCommand) => devicesRequests.sendCommand(data),
  {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['devices']);
      await queryClient.invalidateQueries(['device']);
    },
  }
);

const useBatchCreateDevices = () => useMutation(
  async (items: Record<string, string>[]) => devicesRequests.batchCreate(items),
);

// REAL ESTATE CORE HOOKS

const useRecDataQuery = (connectorId: string, deviceId: string) => useQuery(
  ['device', deviceId, 'real-estate-core'],
  async () => {
    return devicesRequests.getRealEstateCoreData(deviceId);
  },
  {
    ...defaultOptions,
    enabled: !!connectorId,
    refetchOnWindowFocus: false,
    retry: false,
    meta: {
      suppressErrorToaster: true,
    },
  }
);

const useRecRealEstatesQuery = (connectorId: string) => (
  useQuery(
    ['rec', 'realEstates'],
    async () => {
      const data = {
        command: 'apiCall',
        iotnodeId: connectorId,
        data: {callName: 'getRealEstate'}
      };
      return devicesRequests.sendCommand<RealEstateCoreResponse>(data);
    },
    {
      ...defaultOptions,
      enabled: !!connectorId,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )
);

const useRecBuildingsQuery = (connectorId: string) => (
  useQuery(
    ['rec', 'buildings'],
    async () => {
      const data = {
        command: 'apiCall',
        iotnodeId: connectorId,
        data: {callName: 'getBuilding'}
      };
      return devicesRequests.sendCommand<RealEstateCoreResponse>(data);
    },
    {
      ...defaultOptions,
      enabled: !!connectorId,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )
);

const useRecStoreysQuery = (connectorId: string) => (
  useQuery(
    ['rec', 'storeys'],
    async () => {
      const data = {
        command: 'apiCall',
        iotnodeId: connectorId,
        data: {callName: 'getStorey'}
      };
      return devicesRequests.sendCommand<RealEstateCoreResponse>(data);
    },
    {
      ...defaultOptions,
      enabled: !!connectorId,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )
);

const useRecRoomsQuery = (connectorId: string) => (
  useQuery(
    ['rec', 'rooms'],
    async () => {
      const data = {
        command: 'apiCall',
        iotnodeId: connectorId,
        data: {callName: 'getRoom'}
      };
      return devicesRequests.sendCommand<RealEstateCoreResponse>(data);
    },
    {
      ...defaultOptions,
      enabled: !!connectorId,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )
);

const useProvisionRecDevice = (
  queryClient: QueryClient,
  connectorId: string,
  deviceId: string,
) => useMutation(
  async () => {
    const data = {
      command: 'createRecDevice',
      iotnodeId: connectorId,
      data: {
        iotnode: deviceId,
      },
    };
    return devicesRequests.sendCommand(data);
  },
  {
    onError: (err: Error) => {
      const {message: errorMessage} = err;
      toast.error(errorMessage, {id: errorMessage});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['device', deviceId, 'real-estate-core']);
    },
  },
);

interface MountRecDeviceParams {
  realEstateId: string;
  roomId: string;
  isCastellumMatilda: boolean;
}

const useMountRecDevice = (
  queryClient: QueryClient,
  connectorId: string,
  deviceId: string,
  recDeviceId?: string,
) => useMutation(
  async (params: MountRecDeviceParams) => {
    const data = {
      command: 'mountRecDeviceAndCreateChannel',
      iotnodeId: connectorId,
      data: {
        recDeviceId,
        realEstateId: params.realEstateId,
        buildingComponentId: params.roomId,
        isCastellumMatilda: params.isCastellumMatilda,
      },
    };
    return devicesRequests.sendCommand(data);
  },
  {
    onSettled: async () => {
      await queryClient.invalidateQueries(['device', deviceId, 'real-estate-core']);
    },
  }
);

const useDismountRecDevice = (
  queryClient: QueryClient,
  connectorId: string,
  deviceId: string,
) => useMutation(
  async () => {
    const data = {
      command: 'dismountRecDeviceAndDeleteChannel',
      iotnodeId: connectorId,
      data: {
        iotnodeId: deviceId,
      },
    };
    return devicesRequests.sendCommand(data);
  },
  {
    onSettled: async () => {
      await queryClient.invalidateQueries(['device', deviceId, 'real-estate-core']);
    },
  }
);

export {
  useNumDevicesQuery,
  useDevicesQuery,
  useDevicesWithNumTotalDevicesQuery,
  useConnectorsDevicesQuery,
  useConnectorDevicesQuery,
  useDeviceModelNames,
  useDeviceQuery,
  useSeekDevicesQuery,
  useStatisticsFieldsQuery,
  useCreateDevice,
  useUpdateDevice,
  useRemoveDevice,
  useCommandDevice,
  useBatchCreateDevices,

  useRecDataQuery,
  useRecRealEstatesQuery,
  useRecBuildingsQuery,
  useRecStoreysQuery,
  useRecRoomsQuery,
  useProvisionRecDevice,
  useMountRecDevice,
  useDismountRecDevice,

  MountRecDeviceParams,
};
