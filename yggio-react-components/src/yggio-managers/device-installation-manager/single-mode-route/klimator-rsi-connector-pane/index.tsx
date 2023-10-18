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


interface klimatorRsiConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const klimatorRsiConnectorPane = (props: klimatorRsiConnectorPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Klimator RSI Connector</Heading>
      <SubHeading>Please enter Klimator RSI Connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'URL'}
          name={'url'}
          isDisabled={true}
          value={'https://api.roadstatus.info/api'}
          margin={'0 0 10px 0'}
        />
        <TextField
          label={'Country Code'}
          name={'countryCode'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.countryCode.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage=
            {getValidationErrorMessage(props.form.formInputs.countryCode)}
          maxLength={3}
        />
        <TextField
          label={'District ID'}
          name={'districtId'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.districtId.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.districtId)}
          maxLength={10}
        />
        <TextField
          label={'Token'}
          name={'apiToken'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.apiToken.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.apiToken)}
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

export default klimatorRsiConnectorPane;
