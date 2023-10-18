/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';

import {StyledContainerBox} from '../../sub-components';
import TextField from '../../../../components/text-field';
import Button from '../../../../components/button';
import {Form} from '../../../../types';
import {onInputChange} from '../events';
import {getValidationErrorMessage, isFormValid} from '../../../../utils/form-wizard';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';

interface DeltaControlsConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const DeltaControlsConnectorPane = (props: DeltaControlsConnectorPaneProps) => {
  const onContinue = () => {
    if (isFormValid(props.form.formInputs)) {
      props.incrementCurrentStep();
    } else {
      props.form.showAllInputValidations();
    }
  };
  return (
    <StyledContainerBox>
      <Heading>Delta Controls connector info</Heading>
      <SubHeading>Please enter Delta Controls connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'API URL'}
          name={'apiURL'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.apiURL.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.apiURL)}
        />
        <TextField
          label={'Site name'}
          name={'siteName'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.siteName.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.siteName)}
        />
        <TextField
          label={'Username'}
          name={'username'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.username.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.username)}
        />
        <TextField
          label={'Password'}
          name={'password'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.password.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.password)}
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
          onClick={onContinue}
          margin={'20px 0 0 0'}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default DeltaControlsConnectorPane;
