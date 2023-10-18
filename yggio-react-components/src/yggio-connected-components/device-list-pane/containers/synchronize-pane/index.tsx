/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import React from 'react';
import toast from 'react-hot-toast';
import {useQueryClient, useMutation} from '@tanstack/react-query';

// Logic
import {jobTypes} from 'yggio-types';
import {Devices, DeviceCommands} from '../../../../types';
import {getRequestErrorMessage} from '../../../../utils';
import {jobApi, jobRequests} from '../../../../api';
import {selectIsSynchronizable} from './selectors';

// UI
import Button from '../../../../components/button';
import InfoBox from '../../../../components/info-box';
import BatchOperationView from '../../../batch-operation-view';
import ContainerBox from '../../../../components/container-box';
import {CenteredPage} from '../../../../global/components';
import {Heading} from './styled';

interface SynchronizePaneProps {
  selectedDevices: string[];
  devices: Devices;
  setIsInSelectMode(bool: boolean): void;
  setSelectedDevices(devices: string[]): void;
  setPage(page: string): void;
}

const SynchronizePane = (props: SynchronizePaneProps) => {

  const hasSyncableDevices = selectIsSynchronizable({
    devices: props.devices,
    deviceIds: props.selectedDevices,
  });

  const [jobId, setJobId] = React.useState('');

  const jobQuery = jobApi.useJob(jobId);

  const queryClient = useQueryClient();

  const deviceCommandsJobMutation = useMutation(
    async (commands: DeviceCommands) => jobRequests.createDeviceCommandsJob(commands),
    {
      onSuccess: async (job: jobTypes.Job) => {
        await queryClient.invalidateQueries(['job']);
        setJobId(job._id);
      },
      onError: (err: Error) => {
        toast.error(getRequestErrorMessage(err));
      },
    }
  );

  const handleMassSync = () => {
    const validDevices = _.filter(
      props.devices,
      device => _.includes(props.selectedDevices, device._id)
    );
    const commandData = _.map(validDevices, device => {
      const data = {
        command: 'command',
        iotnodeId: device._id,
        integrationCommand: 'synchronize'
      };
      return data;
    });
    deviceCommandsJobMutation.mutate(commandData);
  };

  const onDoneClick = () => {
    props.setIsInSelectMode(false);
    props.setSelectedDevices([]);
    props.setPage('default');
  };

  return (
    <CenteredPage>
      <ContainerBox>
        <Heading>Syncronize devices</Heading>

        {hasSyncableDevices ? (
          <>
            {!jobId ? (
              <>
                <p>You have {_.size(props.selectedDevices)} devices selected.</p>
                <Button
                  margin='10px 0 0 0'
                  color='blue'
                  width='150px'
                  content='Synchronize devices'
                  onClick={handleMassSync}
                />
              </>
            ) : (
              <BatchOperationView
                job={jobQuery.data}
                items={_.map(props.selectedDevices, iotnodeId => ({iotnodeId}))}
                onDoneClick={onDoneClick}
                progressHeading='Syncronizing devices...'
                successesText='devices succeded to syncronize'
                errorsText='devices failed to syncronize'
              />
            )}
          </>
        ) : (
          <>
            <InfoBox
              type={'warning'}
              heading='One or more of the devices are not syncronizable'
              margin='20px 0'
            />
            <Button
              label='Back'
              onClick={onDoneClick}
            />
          </>
        )}
      </ContainerBox>
    </CenteredPage>
  );
};

export default SynchronizePane;
