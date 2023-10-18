/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {useQuery} from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Logic
import {onInputChange} from '../events';
import {Form, TranslatorPreference} from '../../../../types';
import {devicesApi, translatorsRequests} from '../../../../api';

// UI
import Button from '../../../../components/button';
import Select from '../../../../components/select';
import {StyledContainerBox} from '../../sub-components';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';

interface GenericPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
  setTranslatorPreferences: (tp: TranslatorPreference[]) => void;
}

const DeviceModelNamePane = (props: GenericPaneProps) => {

  const useDeviceModelNamesQuery = devicesApi.useDeviceModelNames();

  const selectedDeviceModelName = props.form.formInputs.deviceModelName.value as string;

  // Populate translatorPreferences with a recommended one
  const translatorsQuery = useQuery(
    ['translators', selectedDeviceModelName],
    async () => translatorsRequests.fetch(selectedDeviceModelName),
    {
      enabled: !!selectedDeviceModelName,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      onSuccess: translators => {
        if (!_.isEmpty(translators)) {
          const translator = translators[0];
          const recommended: TranslatorPreference = {
            name: translator.name,
            userId: translator.userId,
            version: translator.version,
            upgradePolicy: 'minor',
          };
          props.setTranslatorPreferences([recommended]);
        }
      },
      onError: () => {
        toast.error('Failed to fetch recommended translator');
      },
    }
  );

  const options = _.map(useDeviceModelNamesQuery.data, deviceModelName => ({
    value: deviceModelName.value,
    label: deviceModelName.displayName,
  }));

  return (
    <StyledContainerBox>
      <Heading>Device model name</Heading>
      <SubHeading>Used to identify the device and for finding suitable translators.</SubHeading>
      <ContentContainer>
        <Select
          label={'Select device model name'}
          options={options}
          value={props.form.formInputs.deviceModelName.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onInputChange(props.form, evt)}
          name={'deviceModelName'}
          isClearable
          isOptional
          isSearchable
          margin={'0 0 10px 0'}
        />
      </ContentContainer>
      <NavButtonsContainer>
        <Button
          content={'Back'}
          ghosted
          onClick={props.onBack}
        />
        <Button
          color={'green'}
          content={'Continue'}
          onClick={props.incrementCurrentStep}
          disabled={translatorsQuery.isFetching}
          isLoading={translatorsQuery.isFetching}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default DeviceModelNamePane;
