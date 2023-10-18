/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';

import {Device, Devices, Parameter} from '../../../../types';
import {CenteredPage} from '../../../../global/components';
import {
  FlexSpaceBetweenWrapper,
  FlexColWrapper,
  TextParagraph,
  HorizontalLine,
} from '../../../../global/styled';
import ContainerBox from '../../../../components/container-box';
import Button from '../../../../components/button';
import TextArea from '../../../../components/text-area';
import InfoBox from '../../../../components/info-box';
import {devicesApi} from '../../../../api';
import {editState} from './state';
import {useLocalState} from '../../../../hooks';
import {TextHeading} from './styled';
import ContextualParametersEditor from '../../../contextual-parameters-editor';

interface EditingProps {
  selectedDevices: string[];
  devices: Devices;
  setSelectedDevices: (devices: string[]) => void;
  setIsInSelectMode: (selectMode: boolean) => void;
  setPage: (page: string) => void;
}

const EditingPane = (props: EditingProps) => {
  /*
    Hooks
  */
  const {t} = useTranslation();
  const queryClient = useQueryClient();

  const {
    mutateAsync: mutateDevice,
    isLoading: isUpdatingDevice,
  } = devicesApi.useUpdateDevice(queryClient);
  const editForm = useLocalState(editState);

  /*
    Event handlers
  */
  const saveDeviceUpdates = async () => {
    const contextMap = editForm.formInputs.contextMap.value as object;
    const description = editForm.formInputs.description.value as string;

    const deviceUpdates = _.map(props.selectedDevices, async (deviceId: string) => {
      const currentDevice = _.find(props.devices, device => device._id === deviceId);
      const desc = description || currentDevice?.description;
      const updates: Partial<Device> = {
        contextMap: {
          ...currentDevice?.contextMap,
          ...contextMap,
        },
        description: desc || '',
      };
      await mutateDevice({deviceId, updates});
    });
    await Promise.all(deviceUpdates);
    editForm.setInputValue('contextMapKey', '');
    editForm.setInputValue('contextMapValue', '');
    editForm.setInputValue('description', '');
    props.setIsInSelectMode(false);
    props.setSelectedDevices([]);
    props.setPage('default');
  };

  const handleContextMapUpdates = (parameters: Parameter[]) => {
    const parametersObject = _.chain(parameters)
      .keyBy('name')
      .mapValues('value')
      .value();
    editForm.setInputValue('contextMap', parametersObject);
  };

  return (
    <CenteredPage>
      <ContainerBox>
        <p>You have {_.size(props.selectedDevices)} devices selected.</p>

        <InfoBox type={'warning'} heading={'Saving new data will overwrite existing data.'} />
        {/* @ts-ignore - styled component not typed */}
        <TextParagraph fontSize={'0.8em'}>
          Fill in all the fields below, and once you are done press the Save
          button to save your new data to all selected devices.
        </TextParagraph>
        <HorizontalLine />
        <TextHeading>Contextual Parameters</TextHeading>

        <ContextualParametersEditor
          onChange={handleContextMapUpdates}
          value={_.map(
            editForm.formInputs.contextMap.value as object,
            (value, name) => ({name, value})
          )}
        />

        <TextHeading>Description</TextHeading>
        {/* @ts-ignore - styled component not typed */}
        <TextParagraph fontSize={'0.8em'}>
          Add a description below. Leave empty to keep old description.
        </TextParagraph>
        {/* @ts-ignore - styled component not typed */}
        <FlexColWrapper margin={'10px 0 30px'}>
          <TextArea
            margin={'0 5px 0 0'}
            name={'description'}
            onChange={evt => (
              editForm.setInputValue('description', evt.target.value))}
            placeholder={'Description'}
            value={editForm.formInputs.description.value as string}
          />

        </FlexColWrapper>

        <FlexSpaceBetweenWrapper>
          <Button
            content={_.capitalize(t('labels.cancel'))}
            onClick={() => props.setPage('default')}
            ghosted
            width={'120px'}
            height={'30px'}
            padding={'0 15px'}
          />
          <Button
            isLoading={isUpdatingDevice}
            content={_.capitalize(t('labels.save'))}
            onClick={saveDeviceUpdates}
            color={'green'}
            width={'200px'}
            height={'30px'}
            padding={'0 15px'}
          />
        </FlexSpaceBetweenWrapper>
      </ContainerBox>
    </CenteredPage>
  );
};

export default EditingPane;
