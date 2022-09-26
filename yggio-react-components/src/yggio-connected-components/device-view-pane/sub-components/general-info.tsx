/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import _ from 'lodash';
import {Icon} from 'react-icons-kit';
import {ic_edit as editIcon} from 'react-icons-kit/md/ic_edit';
import {UseQueryResult, useQueryClient} from '@tanstack/react-query';
import {NextRouter} from 'next/router';
import {confirmAlert} from 'react-confirm-alert';

// Logic
import {devicesApi} from '../../../api';
import {Device, Translate} from '../../../types';
import {getValidationErrorMessage, isFormValid} from '../../../utils/form-wizard';
import {formatTimeSinceLastReported, resolveDeviceType} from '../../../utils';
import {useLocalState} from '../../../hooks';
import {
  nameFormState,
  descriptionFormState,
  deviceModelNameFormState,
} from '../state';

// UI
import Button from '../../../components/button';
import TextField from '../../../components/text-field';
import TextArea from '../../../components/text-area';
import Select from '../../../components/select';
import {
  InfoItem,
  InfoItemTop,
  InfoItemTitle,
  InfoItemMiddle,
  InfoItemBottom,
  InfoItemGreyText,
} from '../styled';

interface GeneralInfoProps {
  deviceQuery: UseQueryResult<Device, unknown>;
  router: NextRouter;
  t: Translate;
}

const GeneralInfo = (props: GeneralInfoProps) => {

  const queryClient = useQueryClient();

  const nameForm = useLocalState(nameFormState);
  const descriptionForm = useLocalState(descriptionFormState);
  const deviceModelNameForm = useLocalState(deviceModelNameFormState);

  const updateDeviceMutation = devicesApi.useUpdateDevice(queryClient);
  const removeDeviceMutation = devicesApi.useRemoveDevice(queryClient);

  const deviceModelNameQuery = devicesApi.useDeviceModelNames();
  const deviceModelNameOptions = _.map(deviceModelNameQuery.data, deviceModelName => ({
    label: deviceModelName.displayName,
    value: deviceModelName.value,
  }));

  const device = props.deviceQuery.data!;

  const handleRemoveDevice = () => {
    const buttons = [
      {
        label: _.capitalize(props.t('common.yes')),
        onClick: async () => {
          removeDeviceMutation.mutate({deviceId: device._id});
          await props.router.push('/devices');
        }
      },
      {
        label: _.capitalize(props.t('common.no')),
        onClick: () => null,
      }
    ];
    confirmAlert({
      title: _.capitalize(props.t('labels.confirmation')),
      message: props.t('phrases.deleteDeviceVerification'),
      buttons,
    });
  };

  return (
    <>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(props.t('common.name'))}</InfoItemTitle>
          {!nameForm.formInputs.isEditing.value && (
            <Button
              content={<Icon icon={editIcon as object} />}
              width={'22px'}
              height={'22px'}
              ghosted
              onClick={() => {
                nameForm.setInputValue('name', device.name || '');
                nameForm.setInputValue('isEditing', true);
              }}
            />
          )}
        </InfoItemTop>
        <InfoItemMiddle>
          {
            nameForm.formInputs.isEditing.value
              ? (
                <TextField
                  name={'name'}
                  value={nameForm.formInputs.name.value as string}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => nameForm.setInputValue('name', evt.target.value)}
                  validationErrorMessage={getValidationErrorMessage(nameForm.formInputs.name)}
                />
              ) : (
                <>
                  {
                    !_.isEmpty(device.name)
                      ? <p>{device.name}</p>
                      : <InfoItemGreyText>{'No name set'}</InfoItemGreyText>
                  }
                </>
              )
          }
        </InfoItemMiddle>
        <InfoItemBottom>
          {nameForm.formInputs.isEditing.value && (
            <Button
              label={_.capitalize(props.t('labels.save'))}
              color={'green'}
              height={'32px'}
              width={'90px'}
              margin={'0 5px 0 0'}
              isLoading={props.deviceQuery.isLoading}
              disabled={!isFormValid(nameForm.formInputs)}
              onClick={() => {
                updateDeviceMutation.mutate({
                  updates: {name: nameForm.formInputs.name.value as string},
                  deviceId: device._id,
                });
                nameForm.setInputValue('isEditing', false);
              }}
            />
          )}
          {nameForm.formInputs.isEditing.value && !props.deviceQuery.isLoading && (
            <Button
              label={_.capitalize(props.t('labels.cancel'))}
              height={'32px'}
              width={'90px'}
              onClick={() => {
                nameForm.setInputValue('isEditing', false);
              }}
            />
          )}
        </InfoItemBottom>
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(props.t('titles.description'))}</InfoItemTitle>
          {!descriptionForm.formInputs.isEditing.value && (
            <Button
              content={<Icon icon={editIcon as object} />}
              width={'22px'}
              height={'22px'}
              ghosted
              onClick={() => {
                if (device.description) {
                  descriptionForm.setInputValue('description', device.description);
                }
                descriptionForm.setInputValue('isEditing', true);
              }}
            />
          )}
        </InfoItemTop>
        <InfoItemMiddle>
          {
            descriptionForm.formInputs.isEditing.value
              ? (
                <TextArea
                  name={'description'}
                  value={descriptionForm.formInputs.description.value as string}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => descriptionForm.setInputValue('description', evt.target.value)}
                  validationErrorMessage={
                    getValidationErrorMessage(descriptionForm.formInputs.description)
                  }
                />
              ) : (
                <>
                  {
                    !_.isEmpty(device.description)
                      ? <p>{device.description}</p>
                      : <InfoItemGreyText>{_.capitalize(props.t('titles.noDescriptionSet'))}</InfoItemGreyText>
                  }
                </>
              )
          }
        </InfoItemMiddle>
        <InfoItemBottom>
          {descriptionForm.formInputs.isEditing.value && (
            <Button
              label={_.capitalize(props.t('labels.save'))}
              color={'green'}
              height={'32px'}
              width={'90px'}
              margin={'0 5px 0 0'}
              isLoading={props.deviceQuery.isLoading}
              onClick={() => {
                updateDeviceMutation.mutate({
                  updates: {description: descriptionForm.formInputs.description.value as string},
                  deviceId: device._id,
                });
                descriptionForm.setInputValue('isEditing', false);
              }}
            />
          )}
          {descriptionForm.formInputs.isEditing.value && !_.get(props, 'device.isLoading') && (
            <Button
              label={_.capitalize(props.t('labels.cancel'))}
              height={'32px'}
              width={'90px'}
              onClick={() => {
                descriptionForm.setInputValue('isEditing', false);
              }}
            />
          )}
        </InfoItemBottom>
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(props.t('labels.deviceModelName'))}</InfoItemTitle>
          {!deviceModelNameForm.formInputs.isEditing.value && (
            <Button
              content={<Icon icon={editIcon as object} />}
              width={'22px'}
              height={'22px'}
              ghosted
              onClick={() => {
                if (device.deviceModelName) {
                  deviceModelNameForm.setInputValue('deviceModelName', device.deviceModelName);
                }
                deviceModelNameForm.setInputValue('isEditing', true);
              }}
            />
          )}
        </InfoItemTop>
        <InfoItemMiddle>
          {
            deviceModelNameForm.formInputs.isEditing.value
              ? (
                <Select
                  name={'deviceModelName'}
                  placeholder={_.capitalize(props.t('placeholders.select'))}
                  options={deviceModelNameOptions}
                  value={deviceModelNameForm.formInputs.deviceModelName.value as string}
                  onChange={(evt: React.ChangeEvent<HTMLInputElement>) => deviceModelNameForm.setInputValue('deviceModelName', evt.target.value || '')}
                  isClearable
                  margin={'0 0 10px 0'}
                />
              ) : (
                <>
                  {
                    device.deviceModelName
                      ? <p>{device.deviceModelName}</p>
                      : <InfoItemGreyText>{_.capitalize(props.t('titles.noDeviceModelName'))}</InfoItemGreyText>
                  }
                </>
              )
          }
        </InfoItemMiddle>
        <InfoItemBottom>
          {deviceModelNameForm.formInputs.isEditing.value && (
            <Button
              label={_.capitalize(props.t('labels.save'))}
              color={'green'}
              height={'32px'}
              width={'90px'}
              margin={'0 5px 0 0'}
              isLoading={props.deviceQuery.isLoading}
              onClick={() => {
                updateDeviceMutation.mutate({
                  updates: {
                    deviceModelName: deviceModelNameForm.formInputs.deviceModelName.value as string
                  },
                  deviceId: device._id,
                });
                deviceModelNameForm.setInputValue('isEditing', false);
              }}
            />
          )}
          {deviceModelNameForm.formInputs.isEditing.value && !props.deviceQuery.isLoading && (
            <Button
              label={_.capitalize(props.t('labels.cancel'))}
              height={'32px'}
              width={'90px'}
              onClick={() => {
                deviceModelNameForm.setInputValue('isEditing', false);
              }}
            />
          )}
        </InfoItemBottom>
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(props.t('titles.deviceType'))}</InfoItemTitle>
        </InfoItemTop>
        <InfoItemMiddle>
          <p>{resolveDeviceType(device)}</p>
        </InfoItemMiddle>
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.toUpper(props.t('common.id'))}</InfoItemTitle>
        </InfoItemTop>
        <InfoItemMiddle>
          <p>{device._id}</p>
        </InfoItemMiddle>
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(props.t('common.lastReported'))}</InfoItemTitle>
        </InfoItemTop>
        <InfoItemMiddle>
          <p>{formatTimeSinceLastReported(device.reportedAt)}</p>
        </InfoItemMiddle>
      </InfoItem>

      <Button
        content={_.capitalize(props.t('labels.deleteDevice'))}
        color={'red'}
        ghosted
        onClick={handleRemoveDevice}
        margin={'30px 0 0 0'}
      />
    </>
  );
};

export default GeneralInfo;
