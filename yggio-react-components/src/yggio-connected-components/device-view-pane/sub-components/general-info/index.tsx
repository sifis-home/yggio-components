/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React, {useState} from 'react';
import _ from 'lodash';
import {MdMode as EditIcon} from 'react-icons/md';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {NextRouter} from 'next/router';
import {toast} from 'react-hot-toast';
import {useTranslation} from 'react-i18next';

// Logic
import formState from './state';
import {handleDeleteDevice} from './events';
import {devicesRequests, devicesApi} from '../../../../api';
import {Device} from '../../../../types';
import {getValidationErrorMessage} from '../../../../utils/form-wizard';
import {formatTimeSinceLastReported, resolveDeviceType, getRequestErrorMessage} from '../../../../utils';
import {useLocalState} from '../../../../hooks';

// UI
import Button from '../../../../components/button';
import TextField from '../../../../components/text-field';
import TextArea from '../../../../components/text-area';
import Select from '../../../../components/select';
import {
  InfoItem,
  InfoItemTop,
  InfoItemTitle,
  InfoItemMiddle,
  InfoItemBottom,
  InfoItemGreyText,
} from '../../styled';

interface GeneralInfoProps {
  device: Device;
  router: NextRouter;
}

const GeneralInfo = (props: GeneralInfoProps) => {
  const {t} = useTranslation();

  const queryClient = useQueryClient();

  const form = useLocalState(formState);

  const [inputBeingEdited, setInputBeingEdited] = useState('');

  const updateDeviceMutation = useMutation(
    async (updates: Partial<Device>) => devicesRequests.update({deviceId: props.device._id, updates}),
    {
      onSuccess: async () => {
        setInputBeingEdited('');
        await queryClient.invalidateQueries(['devices']);
        await queryClient.invalidateQueries(['device']);
        toast.success('Device was successfully updated');
      },
      onError: (err: Error) => {
        toast.error(getRequestErrorMessage(err));
      },
    }
  );

  const removeDeviceMutation = devicesApi.useRemoveDevice(queryClient);

  const deviceModelNameQuery = devicesApi.useDeviceModelNames();

  const deviceModelNameOptions = _.map(deviceModelNameQuery.data, deviceModelName => ({
    label: deviceModelName.displayName,
    value: deviceModelName.value,
  }));

  const deviceRecDataQuery = devicesApi.useRecDataQuery(props.device._id);

  const isMountedInRec = !!_.get(deviceRecDataQuery, 'data.isMountedInBuildingComponent["@id"]');

  return (
    <>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(t('common.name'))}</InfoItemTitle>
          {inputBeingEdited !== 'name' && (
            <Button
              content={<EditIcon size={14} />}
              width={'22px'}
              height={'22px'}
              ghosted
              onClick={() => {
                form.setInputValue('name', props.device.name || '');
                setInputBeingEdited('name');
              }}
            />
          )}
        </InfoItemTop>
        <InfoItemMiddle>
          {
            inputBeingEdited === 'name'
              ? (
                <TextField
                  name={'name'}
                  value={form.formInputs.name.value as string}
                  onChange={evt => form.setInputValue('name', evt.target.value)}
                  validationErrorMessage={getValidationErrorMessage(form.formInputs.name)}
                />
              ) : (
                <>
                  {
                    !_.isEmpty(props.device.name)
                      ? <p>{props.device.name}</p>
                      : <InfoItemGreyText>{'No name set'}</InfoItemGreyText>
                  }
                </>
              )
          }
        </InfoItemMiddle>
        {inputBeingEdited === 'name' && (
          <InfoItemBottom>
            <Button
              label={_.capitalize(t('labels.save'))}
              color={'green'}
              height={'32px'}
              width={'90px'}
              margin={'0 5px 0 0'}
              isLoading={updateDeviceMutation.isLoading}
              disabled={!form.formInputs.name.validation.isValid}
              onClick={() => {
                updateDeviceMutation.mutate({name: form.formInputs.name.value as string});
              }}
            />
            <Button
              label={_.capitalize(t('labels.cancel'))}
              height={'32px'}
              width={'90px'}
              onClick={() => {
                setInputBeingEdited('');
              }}
            />
          </InfoItemBottom>
        )}
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(t('titles.description'))}</InfoItemTitle>
          {inputBeingEdited !== 'description' && (
            <Button
              content={<EditIcon size={14} />}
              width={'22px'}
              height={'22px'}
              ghosted
              onClick={() => {
                if (props.device.description) {
                  form.setInputValue('description', props.device.description);
                }
                setInputBeingEdited('description');
              }}
            />
          )}
        </InfoItemTop>
        <InfoItemMiddle>
          {
            inputBeingEdited === 'description'
              ? (
                <TextArea
                  name={'description'}
                  value={form.formInputs.description.value as string}
                  onChange={evt => form.setInputValue('description', evt.target.value)}
                  validationErrorMessage={
                    getValidationErrorMessage(form.formInputs.description)
                  }
                />
              ) : (
                <>
                  {
                    !_.isEmpty(props.device.description)
                      ? <p>{props.device.description}</p>
                      : <InfoItemGreyText>{_.capitalize(t('titles.noDescriptionSet'))}</InfoItemGreyText>
                  }
                </>
              )
          }
        </InfoItemMiddle>
        {inputBeingEdited === 'description' && (
          <InfoItemBottom>
            <Button
              label={_.capitalize(t('labels.save'))}
              color={'green'}
              height={'32px'}
              width={'90px'}
              margin={'0 5px 0 0'}
              disabled={!form.formInputs.description.validation.isValid}
              isLoading={updateDeviceMutation.isLoading}
              onClick={() => {
                updateDeviceMutation.mutate({description: form.formInputs.description.value as string});
              }}
            />
            <Button
              label={_.capitalize(t('labels.cancel'))}
              height={'32px'}
              width={'90px'}
              onClick={() => {
                setInputBeingEdited('');
              }}
            />
          </InfoItemBottom>
        )}

      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(t('labels.deviceModelName'))}</InfoItemTitle>
          {inputBeingEdited !== 'deviceModelName' && (
            <Button
              content={<EditIcon size={14} />}
              width={'22px'}
              height={'22px'}
              ghosted
              onClick={() => {
                if (props.device.deviceModelName) {
                  form.setInputValue('deviceModelName', props.device.deviceModelName);
                }
                setInputBeingEdited('deviceModelName');
              }}
            />
          )}
        </InfoItemTop>
        <InfoItemMiddle>
          {
            inputBeingEdited === 'deviceModelName'
              ? (
                <Select
                  name={'deviceModelName'}
                  placeholder={_.capitalize(t('placeholders.select'))}
                  options={deviceModelNameOptions}
                  value={form.formInputs.deviceModelName.value as string}
                  onChange={evt => form.setInputValue('deviceModelName', evt.target.value || '')}
                  isClearable
                  isSearchable
                  margin={'0 0 10px 0'}
                />
              ) : (
                <>
                  {
                    props.device.deviceModelName
                      ? <p>{props.device.deviceModelName}</p>
                      : <InfoItemGreyText>{_.capitalize(t('titles.noDeviceModelName'))}</InfoItemGreyText>
                  }
                </>
              )
          }
        </InfoItemMiddle>
        {inputBeingEdited === 'deviceModelName' && (
          <InfoItemBottom>
            <Button
              label={_.capitalize(t('labels.save'))}
              color={'green'}
              height={'32px'}
              width={'90px'}
              margin={'0 5px 0 0'}
              isLoading={updateDeviceMutation.isLoading}
              onClick={() => {
                updateDeviceMutation.mutate({deviceModelName: form.formInputs.deviceModelName.value as string});
              }}
            />
            <Button
              label={_.capitalize(t('labels.cancel'))}
              height={'32px'}
              width={'90px'}
              onClick={() => {
                setInputBeingEdited('');
              }}
            />
          </InfoItemBottom>
        )}
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(t('titles.deviceType'))}</InfoItemTitle>
        </InfoItemTop>
        <InfoItemMiddle>
          <p>{resolveDeviceType(props.device)}</p>
        </InfoItemMiddle>
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.toUpper(t('common.id'))}</InfoItemTitle>
        </InfoItemTop>
        <InfoItemMiddle>
          <p>{props.device._id}</p>
        </InfoItemMiddle>
      </InfoItem>

      <InfoItem>
        <InfoItemTop>
          <InfoItemTitle>{_.capitalize(t('common.lastReported'))}</InfoItemTitle>
        </InfoItemTop>
        <InfoItemMiddle>
          <p>{formatTimeSinceLastReported(props.device.reportedAt)}</p>
        </InfoItemMiddle>
      </InfoItem>

      <Button
        content={_.capitalize(t('labels.deleteDevice'))}
        color={'red'}
        width={'110px'}
        ghosted
        onClick={() => handleDeleteDevice({
          deviceId: props.device._id,
          isMountedInRec,
          removeDeviceMutation,
          router: props.router,
          t,
        })}
        margin={'30px 0 0 0'}
      />
    </>
  );
};

export default GeneralInfo;
