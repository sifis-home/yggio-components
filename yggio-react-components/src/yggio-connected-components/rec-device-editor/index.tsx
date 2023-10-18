import React from 'react';
import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';

// Logic
import {usePersistentState} from '../../hooks';
import {realEstateCoreFormState} from './state';
import {devicesApi} from '../../api';
import {Device, Form} from '../../types';
import {selectRealEstateCoreOptions, selectRealEstateCorePopulateData} from './selectors';

// UI
import Select from '../../components/select';
import ProvisioningSection from './sub-components/provisioning-section';
import MountedSection from './sub-components/mounted-section';
import MountingSection from './sub-components/mounting-section';

interface Props {
  deviceId: string;
  connectors: Device[];
}

const RecDeviceEditor = (props: Props) => {

  const queryClient = useQueryClient();

  const form = usePersistentState(realEstateCoreFormState, 'real-estate-core') as Form;

  const selectedConnectorId = form.formInputs.connector.value as string;

  const deviceRecDataQuery = devicesApi.useRecDataQuery(props.deviceId);

  const recDeviceId = deviceRecDataQuery.data?.deviceId;

  const provisionRecDeviceMutation = devicesApi.useProvisionRecDevice(
    queryClient,
    selectedConnectorId,
    props.deviceId,
  );
  const mountRecDeviceMutation = devicesApi.useMountRecDevice(
    queryClient,
    selectedConnectorId,
    props.deviceId,
    recDeviceId,
  );
  const dismountRecDeviceMutation = devicesApi.useDismountRecDevice(
    queryClient,
    selectedConnectorId,
    props.deviceId,
  );

  const isProvisioned = !!deviceRecDataQuery.data;
  const mountedRoomId = _.get(deviceRecDataQuery, 'data.isMountedInBuildingComponent["@id"]');
  const isMounted = !!mountedRoomId;

  const realEstatesQuery = devicesApi.useRecRealEstatesQuery(selectedConnectorId);
  const buildingsQuery = devicesApi.useRecBuildingsQuery(selectedConnectorId);
  const storeysQuery = devicesApi.useRecStoreysQuery(selectedConnectorId);
  const roomsQuery = devicesApi.useRecRoomsQuery(selectedConnectorId);

  const options = selectRealEstateCoreOptions(
    form.formInputs,
    realEstatesQuery.data,
    buildingsQuery.data,
    storeysQuery.data,
    roomsQuery.data
  );

  const mountQueriesAreLoading = _.some([
    realEstatesQuery.isFetching,
    buildingsQuery.isFetching,
    storeysQuery.isFetching,
    roomsQuery.isFetching
  ]);

  const mountQueriesDidFail = _.some([
    realEstatesQuery.isError,
    buildingsQuery.isError,
    storeysQuery.isError,
    roomsQuery.isError,
  ]);

  const mountedData = selectRealEstateCorePopulateData(
    mountedRoomId,
    realEstatesQuery.data,
    buildingsQuery.data,
    storeysQuery.data,
    roomsQuery.data
  );

  return (
    <>

      <Select
        label={'Connector'}
        options={_.map(props.connectors, connector => ({
          value: connector._id,
          label: connector.name || 'no-name',
        }))}
        onChange={evt => form.setInputValue('connector', evt.target.value)}
        value={selectedConnectorId}
        isClearable
        margin={'15px 0 15px 0'}
      />

      {!!selectedConnectorId && (
        <ProvisioningSection
          isProvisioned={isProvisioned}
          provisionRecDeviceMutation={provisionRecDeviceMutation}
          deviceRecDataQueryIsLoading={deviceRecDataQuery.isLoading}
        />
      )}

      {!!selectedConnectorId && !!isMounted && (
        <MountedSection
          mountedData={mountedData}
          mountQueriesAreLoading={mountQueriesAreLoading}
          dismountRecDeviceMutation={dismountRecDeviceMutation}
          mountQueriesDidFail={mountQueriesDidFail}
        />
      )}

      {!!selectedConnectorId && isProvisioned && !isMounted && (
        <MountingSection
          form={form}
          options={options}
          realEstatesQueryIsLoading={realEstatesQuery.isLoading}
          buildingsQueryIsLoading={buildingsQuery.isLoading}
          storeysQueryIsLoading={storeysQuery.isLoading}
          roomsQueryIsLoading={roomsQuery.isLoading}
          mountRecDeviceMutation={mountRecDeviceMutation}
        />
      )}

    </>
  );
};

export default RecDeviceEditor;
