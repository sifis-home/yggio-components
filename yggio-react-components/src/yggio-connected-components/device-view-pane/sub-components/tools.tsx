/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {formatDistance, parseISO} from 'date-fns';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import toast from 'react-hot-toast';

import {Device} from '../../../types';
import Button from '../../../components/button';
import {ToolsContainer, NoDataBox} from '../styled';
import {getRequestErrorMessage} from '../../../utils';
import {canBeSynchronized} from '../utils';
import {devicesRequests} from '../../../api';

interface Props {
  device: Device;
}

const Tools = (props: Props) => {

  const queryClient = useQueryClient();

  const commandDeviceMutation = useMutation(
    async () => devicesRequests.sendCommand({
      command: 'synchronize',
      iotnodeId: props.device._id,
    }),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['devices']);
        await queryClient.invalidateQueries(['device']);
        toast.success('Device syncronized successfully');
      },
      onError: error => {
        toast.error(getRequestErrorMessage(error), {duration: 7000});
      },
    }
  );

  if (!canBeSynchronized(props.device)) {
    return <NoDataBox>No tools available</NoDataBox>;
  }

  return (
    <ToolsContainer>
      <h4>Synchronization</h4>
      <p>Synchronize device to force contact with its integration</p>

      <Button
        color={'blue'}
        margin={'20px 0 8px'}
        height={'30px'}
        content={'Synchronize'}
        onClick={() => {
          commandDeviceMutation.mutate();
        }}
        isLoading={commandDeviceMutation.isLoading}
      />
      <p>
        Last synchronization:
        <b>
          {props.device.synchronizedAt
            ? ` ${formatDistance(new Date(), parseISO(props.device.synchronizedAt))} ago`
            : ' never'}
        </b>
      </p>
    </ToolsContainer>
  );
};

export default Tools;
