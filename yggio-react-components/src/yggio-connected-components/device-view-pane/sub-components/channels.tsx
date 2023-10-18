/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import _ from 'lodash';
import {toast} from 'react-hot-toast';
import axios from 'axios';
import {useTranslation} from 'react-i18next';
import {z} from 'zod';
import {channelSchemas} from 'yggio-schemas';

import type {channelTypes} from 'yggio-types';

// Logic
import {useLocalState} from '../../../hooks';
import {channelState, editChannelState} from '../state';
import {channelsRequests, devicesApi} from '../../../api';
import {Device} from '../../../types';
import {getFormValues} from '../../../utils/form-wizard';
import {parseDeltaControlsSettings} from '../../../utils';
import {selectChannelFormIsValid} from '../selectors';
import {extractChannelCreationData} from '../utils';

// UI
import TextField from '../../../components/text-field';
import TextArea from '../../../components/text-area';
import Select from '../../../components/select';
import Button from '../../../components/button';
import {
  ChannelContainer,
  NoDataText,
} from '../styled';
import {
  FlexWrapper,
  FlexColWrapper,
  HorizontalLine,
} from '../../../global/styled';

interface UpdateChannelData {
  channelId: string;
  updates: {
    deltaControls: {
      connectorId: string;
      mappings: z.infer<typeof channelSchemas.deltaControlsSettings>;
    }
  }
}

interface Props {
  device: Device;
  channels?: channelTypes.Channel[];
}

/*
  NOTE: This page needs a refactor.
  We should create a component as much of this a duplicated in "select many"
*/

const Channels = (props: Props) => {
  const {t} = useTranslation();

  const channelForm = useLocalState(channelState);
  const editChannelForm = useLocalState(editChannelState);

  const [editChannelId, setEditChannelId] = useState('');

  const queryClient = useQueryClient();

  const createChannelMutation = useMutation(
    async (data: Omit<channelTypes.Channel, '_id' | 'readableFormat'>) => channelsRequests.create(data),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['channels']);
        channelForm.resetForm();
      },
      onError: err => {
        if (axios.isAxiosError(err)) {
          toast.error(`${err.response?.status} - ${err.response?.data}`);
        }
      }
    },
  );

  const updateChannelMutation = useMutation(
    async (data: UpdateChannelData) => channelsRequests.update(data.channelId, data.updates),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['channels']);
        setEditChannelId('');
        toast.success('Updated channel successfully.');
      },
      onError: err => {
        if (axios.isAxiosError(err)) {
          toast.error(`${err.response?.status} - ${err.response?.data}`);
        }
      }
    },
  );

  const removeChannelMutation = useMutation(
    async (channelId: string) => channelsRequests.remove(channelId),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['channels']);
      },
      onError: err => {
        if (axios.isAxiosError(err)) {
          toast.error(`${err.response?.status} - ${err.response?.data}`);
        }
      }
    },
  );

  const connectors = devicesApi.useConnectorsDevicesQuery();

  const desigoConnectors = _.filter(connectors, {downlinkQueue: 'desigo-cc-connector'});
  const deltaControlsConnectors = _.filter(connectors, {downlinkQueue: 'DeltaControlsEnteliWeb'});

  const createNewChannel = () => {
    const data = extractChannelCreationData(
      props.device._id,
      getFormValues(channelForm.formInputs)
    );
    createChannelMutation.mutate(data);
  };

  const editDeltaControlSettings = (channelId: string, connectorId: string) => {
    const updates = {
      deltaControls: {
        connectorId,
        mappings: parseDeltaControlsSettings(editChannelForm.formInputs.deltaControlsSettings.value),
      }
    };
    updateChannelMutation.mutate({channelId, updates});
  };

  // Sadly our form-wizard is lacking and is unable to handle the validation
  const formIsValid = selectChannelFormIsValid({formInputs: channelForm.formInputs});

  const selectedProtocol = channelForm.formInputs.protocol.value as string;

  return (
    <FlexColWrapper>
      {_.isEmpty(props.channels) && <NoDataText>{t('phrases.noChannelsAdded')}</NoDataText>}
      {!_.isEmpty(props.channels) && (
        <>
          <b>{_.capitalize(t('titles.channels'))}</b>
          {_.map(props.channels, channel => (
            <ChannelContainer key={channel._id}>
              <>
                {channel.readableFormat}
                {channel.deltaControls && editChannelId === channel._id && (
                  <TextArea
                    label='Delta Controls settings'
                    value={editChannelForm.formInputs.deltaControlsSettings.value as string}
                    onChange={evt => editChannelForm.setInputValue('deltaControlsSettings', evt.target.value)}
                    validationErrorMessage={editChannelForm.formInputs.deltaControlsSettings.validation.message}
                    validationSuccessMessage={editChannelForm.formInputs.deltaControlsSettings.validation.isValid ? 'Valid!' : null}
                    height='280px'
                    width='500px'
                    margin={'10px 0 20px 0px'}
                  />
                )}
                <FlexWrapper>
                  {editChannelId === channel._id && (
                    <>
                      <Button
                        label='Save'
                        onClick={() => editDeltaControlSettings(channel._id, channel.deltaControls!.connectorId)}
                        disabled={!editChannelForm.formInputs.deltaControlsSettings.validation.isValid}
                        height='25px'
                        width='70px'
                        color='green'
                        margin='4px 0 0 0'
                      />
                      <Button
                        label='Cancel'
                        onClick={() => setEditChannelId('')}
                        height='25px'
                        width='70px'
                        margin='4px 0 0 4px'
                      />
                    </>
                  )}
                  {!editChannelId && (
                    <Button
                      label='Remove'
                      onClick={() => removeChannelMutation.mutate(channel._id)}
                      height='25px'
                      width='70px'
                      color='red'
                      margin='4px 0 0 0'
                    />
                  )}
                  {channel.deltaControls && !editChannelId && (
                    <Button
                      label='Edit'
                      onClick={() => {
                        editChannelForm.setInputValue('deltaControlsSettings', JSON.stringify(channel.deltaControls!.mappings, null, 2));
                        setEditChannelId(channel._id);
                      }}
                      height='25px'
                      width='70px'
                      color='blue'
                      margin='4px 0 0 4px'
                    />
                  )}
                </FlexWrapper>
              </>
            </ChannelContainer>
          ))}
        </>
      )}

      {/* @ts-ignore component not typed yet */}
      <HorizontalLine margin='15px 0 0 0' />

      <FlexColWrapper style={{width: '500px', marginTop: '15px'}}>

        <h4>Create new channel</h4>

        <TextField
          label={'Name'}
          additionalInfo={'Used only for referencing - can be set to anything.'}
          value={channelForm.formInputs.name.value as string}
          onChange={evt => channelForm.setInputValue('name', evt.target.value)}
          margin={'15px 0 0 0'}
        />

        <Select
          label={'Protocol'}
          options={[
            {value: 'mqtt', label: 'MQTT'},
            {value: 'http', label: 'HTTP'},
            {value: 'azureIotHub', label: 'Azure IoT Hub'},
            {value: 'desigoCC', label: 'Siemens Desigo CC'},
            {value: 'deltaControls', label: 'Delta Controls'},
          ]}
          isClearable
          value={channelForm.formInputs.protocol.value as string}
          onChange={evt => channelForm.setInputValue('protocol', evt.target.value)}
          margin={'15px 0 0 0'}
        />

        {selectedProtocol === 'mqtt' && (
          <>
            <Select
              label={'Type'}
              options={[
                {value: 'keycloakUser', label: 'keycloakUser'},
                {value: 'basicCredentialsSet', label: 'basicCredentialsSet'},
              ]}
              value={channelForm.formInputs.type.value as string}
              onChange={evt => channelForm.setInputValue('type', evt.target.value)}
              margin={'15px 0 0 10px'}
            />
            <TextField
              label={'Recipient'}
              value={channelForm.formInputs.recipient.value as string}
              onChange={evt => channelForm.setInputValue('recipient', evt.target.value)}
              margin={'15px 0 0 10px'}
            />
          </>
        )}

        {selectedProtocol === 'http' && (
          <TextField
            label={'URL'}
            value={channelForm.formInputs.url.value as string}
            onChange={evt => channelForm.setInputValue('url', evt.target.value)}
            margin={'15px 0 0 10px'}
          />
        )}

        {selectedProtocol === 'azureIotHub' && (
          <TextField
            label={'Connection string'}
            value={channelForm.formInputs.connectionString.value as string}
            onChange={evt => channelForm.setInputValue('connectionString', evt.target.value)}
            margin={'15px 0 0 10px'}
          />
        )}

        {selectedProtocol === 'desigoCC' && (
          <>
            <Select
              label={'Connector'}
              options={_.map(desigoConnectors, device => ({
                value: device._id,
                label: device.name || 'no-name',
              }))}
              value={channelForm.formInputs.connector.value as string}
              onChange={evt => channelForm.setInputValue('connector', evt.target.value)}
              margin={'15px 0 0 10px'}
            />
            <TextField
              label={'Desigo Object'}
              value={channelForm.formInputs.desigoObject.value as string}
              onChange={evt => channelForm.setInputValue('desigoObject', evt.target.value)}
              validationErrorMessage={
                channelForm.formInputs.desigoObject.value
                  ? channelForm.formInputs.desigoObject.validation.message : null
              }
              margin={'15px 0 0 10px'}
            />
          </>
        )}

        {selectedProtocol === 'deltaControls' && (
          <>
            <Select
              label={'Connector'}
              options={_.map(deltaControlsConnectors, device => ({
                value: device._id,
                label: device.name || 'no-name',
              }))}
              value={channelForm.formInputs.connector.value as string}
              onChange={evt => channelForm.setInputValue('connector', evt.target.value)}
              margin={'15px 0 0 10px'}
            />
            <TextArea
              label='Delta Controls settings'
              value={channelForm.formInputs.deltaControlsSettings.value as string}
              onChange={evt => channelForm.setInputValue('deltaControlsSettings', evt.target.value)}
              validationErrorMessage={channelForm.formInputs.deltaControlsSettings.validation.message}
              validationSuccessMessage={channelForm.formInputs.deltaControlsSettings.validation.isValid ? 'Valid!' : null}
              height='280px'
              margin={'15px 0 0 10px'}
            />
          </>
        )}

        <Button
          label={'Create channel'}
          isLoading={createChannelMutation.isLoading}
          disabled={!formIsValid}
          width={'140px'}
          onClick={createNewChannel}
          color={'green'}
          margin={'30px 0 0 0'}
        />
      </FlexColWrapper>
    </FlexColWrapper>
  );
};

export default Channels;
