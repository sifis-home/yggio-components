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


interface SiemensDesigoCcConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const SiemensDesigoCcConnectorPane = (props: SiemensDesigoCcConnectorPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Siemens Desigo CC Connector</Heading>
      <SubHeading>Please enter Siemens Desigo CC Connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'URL'}
          name={'url'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.url.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage=
            {getValidationErrorMessage(props.form.formInputs.url)}
          maxLength={64}
        />
        <TextField
          label={'Username'}
          name={'username'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.username.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage=
            {getValidationErrorMessage(props.form.formInputs.username)}
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

export default SiemensDesigoCcConnectorPane;
