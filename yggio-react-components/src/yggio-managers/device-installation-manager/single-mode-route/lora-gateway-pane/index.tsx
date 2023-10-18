/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';

import {getValidationErrorMessage} from '../../../../utils/form-wizard';
import {onContinue} from './events';
import {onInputChange} from '../events';
import {Form} from '../../../../types';
import {devicesApi} from '../../../../api';

import Button from '../../../../components/button';
import TextField from '../../../../components/text-field';
import Select from '../../../../components/select';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';
import {selectLoraConnectors} from './selectors';

interface LoRaGatewayProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}

const LoRaGateway = (props: LoRaGatewayProps) => {

  const devices = devicesApi.useConnectorsDevicesQuery();
  const fetchConnectorDevicesResult = selectLoraConnectors(devices);

  return (
    <StyledContainerBox>
      <Heading>LoRa Gateway</Heading>
      <SubHeading>Please enter LoRa Gateway specific information</SubHeading>
      <ContentContainer>
        <Select
          label={'Add connector'}
          options={_.map(fetchConnectorDevicesResult, connector => ({
            label: connector.name || 'no-name',
            value: connector._id,
          }))}
          value={(props.form.formInputs.connector.value as string)}
          fullHeight
          name={'connector'}
          margin={'0 0 15px 0'}
          onChange={evt => onInputChange(props.form, evt)}
          additionalInfo={'The LoRa Gateway needs a connector to function properly'}
        />
        <TextField
          label={'Gateway Eui'}
          value={props.form.formInputs.loraGatewayDevEui.value as string}
          onChange={evt => onInputChange(props.form, evt)}
          name={'loraGatewayDevEui'}
          fullHeight
          margin={'0 0 10px 0'}
          additionalInfo={'Please enter a valid hex-string as your Extended Unique Identifier'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.loraGatewayDevEui)}
        />
      </ContentContainer>
      <NavButtonsContainer>
        <Button
          content={'Back'}
          ghosted
          onClick={props.onBack}
        />
        <Button
          disabled={!props.form.formInputs.connector.value}
          color={'green'}
          content={'Continue'}
          onClick={() => (
            onContinue(
              props.form.formInputs,
              props.incrementCurrentStep,
              props.form.showAllInputValidations,
            )
          )}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default LoRaGateway;
