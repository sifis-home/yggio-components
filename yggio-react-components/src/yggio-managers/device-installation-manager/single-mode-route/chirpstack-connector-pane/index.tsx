/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';
import TextField from '../../../../components/text-field';
import Button from '../../../../components/button';
import {Form} from '../../../../types';
import {onInputChange} from '../events';
import {onContinue} from './events';
import {getValidationErrorMessage} from '../../../../utils/form-wizard';


interface ChirpstackConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const ChirpstackConnectorPane = (props: ChirpstackConnectorPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>ChirpStack connector info</Heading>
      <SubHeading>Please enter ChirpStack connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'ChirpStack URL'}
          name={'chirpstackUrl'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.chirpstackUrl.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.chirpstackUrl)}
          maxLength={255}
        />
        <TextField
          label={'Application ID'}
          name={'applicationId'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.applicationId.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.applicationId)}
          maxLength={2}
        />
        <TextField
          label={'Username'}
          name={'username'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.username.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.username)}
          maxLength={64}
        />
        <TextField
          label={'Password'}
          name={'password'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.password.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.password)}
          maxLength={64}
        />
        <TextField
          label={'Organization ID'}
          name={'organizationId'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.organizationId.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.organizationId)}
          maxLength={4}
        />
        <TextField
          label={'Network Server ID'}
          name={'networkServerId'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.networkServerId.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.networkServerId)}
          maxLength={4}
        />
        <TextField
          label={'Device Profile IDs ABP'}
          name={'deviceProfileIdsAbp'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.deviceProfileIdsAbp.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs.deviceProfileIdsAbp
          )}
          maxLength={36}
        />
        <TextField
          label={'Device Profile IDs OTAA'}
          name={'deviceProfileIdsOtaa'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.deviceProfileIdsOtaa.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(
            props.form.formInputs.deviceProfileIdsOtaa
          )}
          maxLength={36}
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

export default ChirpstackConnectorPane;
