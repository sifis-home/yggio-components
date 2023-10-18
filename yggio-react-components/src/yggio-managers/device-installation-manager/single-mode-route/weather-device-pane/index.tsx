/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {useTranslation} from 'react-i18next';

import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';
import {devicesApi} from '../../../../api';
import TextField from '../../../../components/text-field';
import Select from '../../../../components/select';
import Button from '../../../../components/button';
import {Form} from '../../../../types';
import {onInputChange} from '../events';
import {onContinue} from './events';
import {getValidationErrorMessage} from '../../../../utils/form-wizard';

interface WeatherDevicePaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const weatherDevicePane = (props: WeatherDevicePaneProps) => {
  const {t} = useTranslation();
  const connectorQuery = devicesApi.useConnectorDevicesQuery('open-weather-map');
  return (
    <StyledContainerBox>
      <Heading>{t('labels.weatherDeviceInfo')}</Heading>
      <SubHeading>{t('phrases.weatherDeviceInformation')}</SubHeading>
      <ContentContainer>
        <Select
          label='Connector'
          name='connector'
          options={_.map(connectorQuery.data, connector => ({label: connector.name || 'no-name', value: connector._id}))}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.connector.value as string}
          margin={'0 0 15px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.connector)}
        />
        <TextField
          label={'Device Model Name'}
          name={'deviceModelName'}
          onChange={evt => onInputChange(props.form, evt)}
          value={'open-weather-map'}
          margin={'0 0 10px 0'}
          disabled
        />
      </ContentContainer>
      <NavButtonsContainer>
        <Button
          content={'Back'}
          ghosted
          onClick={props.onBack}
          margin={'20px 0 0 0'}
        />
        <Button
          color={'green'}
          content={'Continue'}
          onClick={() => (
            onContinue(
              props.form.formInputs,
              props.form.showAllInputValidations,
              props.incrementCurrentStep,
            )
          )}
          margin={'20px 0 0 0'}
        />
      </NavButtonsContainer>


    </StyledContainerBox>

  );
};

export default weatherDevicePane;
