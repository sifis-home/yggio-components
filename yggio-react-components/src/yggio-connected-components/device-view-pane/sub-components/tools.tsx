import React, {useState} from 'react';
import {formatDistance, parseISO} from 'date-fns';
import {useQueryClient, useMutation, QueryClient} from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {LORA_IMPORT_COMMANDS} from '../constants';
import {Device} from '../../../types';
import Button from '../../../components/button';
import InfoBox from '../../../components/info-box';
import {HorizontalLine} from '../../../global/styled';
import {NoDataBox, ToolHeading, ToolNote} from '../styled';
import {getRequestErrorMessage} from '../../../utils';
import {
  checkDeviceIsSynchronizable,
  checkDeviceSupportsImport
} from '../utils';
import {devicesRequests} from '../../../api';

interface Props {
  device: Device;
}

/*
  TODO: Refactor and put into a folder
*/

const Tools = (props: Props) => {

  const queryClient = useQueryClient();

  const showSync = checkDeviceIsSynchronizable(props.device);
  const showImport = checkDeviceSupportsImport(props.device);

  if (!showSync && !showImport) {
    return (
      <>
        <NoDataBox>No tools available</NoDataBox>
      </>
    );
  }

  return (
    <>

      {showSync && (
        <SynchronizeTool
          device={props.device}
          queryClient={queryClient}
        />
      )}

      {showImport && (
        <ImportTool
          device={props.device}
          queryClient={queryClient}
        />
      )}


    </>
  );
};
interface SynchronizeToolProps {
  device: Device;
  queryClient: QueryClient;
}

const SynchronizeTool = (props: SynchronizeToolProps) => {

  const syncDeviceMutation = useMutation(
    async () => devicesRequests.sendCommand({
      command: 'synchronize',
      iotnodeId: props.device._id,
    }),
    {
      onSuccess: async () => {
        await props.queryClient.invalidateQueries(['devices']);
        await props.queryClient.invalidateQueries(['device']);
        toast.success('Device syncronized successfully');
      },
      onError: error => {
        toast.error(getRequestErrorMessage(error), {duration: 7000});
      },
    }
  );

  return (
    <>
      <ToolHeading>Synchronization</ToolHeading>
      <ToolNote>Synchronize device to force contact with its integration.</ToolNote>

      <Button
        color={'blue'}
        margin={'20px 0 8px'}
        height={'30px'}
        width={'140px'}
        content={'Synchronize device'}
        onClick={() => {
          syncDeviceMutation.mutate();
        }}
        isLoading={syncDeviceMutation.isLoading}
      />
      <ToolNote>
            Last synchronization:
        <b>
          {props.device.synchronizedAt
            ? ` ${formatDistance(new Date(), parseISO(props.device.synchronizedAt))} ago`
            : ' never'}
        </b>
      </ToolNote>
    </>
  );
};

interface ImportToolProps {
  device: Device;
  queryClient: QueryClient;
}

const ImportTool = (props: ImportToolProps) => {

  const [hasStartedImport, setHasStartedImport] = useState(false);

  const importDevicesMutation = useMutation(
    async () => devicesRequests.sendCommand({
      command: LORA_IMPORT_COMMANDS[props.device.downlinkQueue!],
      iotnodeId: props.device._id,
    }),
    {
      onMutate: () => {
        setHasStartedImport(true);
      }
    }
  );

  return (
    <>
      {/* @ts-ignore not typed yet */}
      <HorizontalLine margin='20px 0 30px 0' />

      <ToolHeading>Import LoRa devices</ToolHeading>
      <ToolNote>
            This action will try to fetch all devices from
            the <i>{props.device.downlinkQueue}</i> LoRa server and create them in Yggio.
            Devices that already exist in Yggio will be ignored.
      </ToolNote>

      {!hasStartedImport ? (
        <Button
          color={'blue'}
          margin={'20px 0 8px'}
          height={'30px'}
          width={'120px'}
          content={'Import devices'}
          onClick={() => {
            importDevicesMutation.mutate();
          }}
        />
      ) : (
        <InfoBox
          heading='Import has started'
          content='If successfull devices will be added to Yggio in the following moments.'
          margin='20px 0 0 0'
        />
      )}

    </>
  );
};

export default Tools;
