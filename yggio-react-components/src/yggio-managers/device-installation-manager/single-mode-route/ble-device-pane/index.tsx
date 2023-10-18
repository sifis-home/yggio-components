import React from 'react';
import _ from 'lodash';

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

interface bleDevicePaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const bleDevicePane = (props: bleDevicePaneProps) => {
  const connectorQuery = devicesApi.useConnectorDevicesQuery('bleGateway');
  return (
    <StyledContainerBox>
      <Heading>BLE Device info</Heading>
      <SubHeading>Please enter BLE Device specific information</SubHeading>
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
          label={'MAC address'}
          name={'macAddress'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.macAddress.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.macAddress)}
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

export default bleDevicePane;
