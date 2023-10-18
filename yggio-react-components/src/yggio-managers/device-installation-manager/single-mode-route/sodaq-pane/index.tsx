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


interface SodaqPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const SodaqPane = (props: SodaqPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Sodaq info</Heading>
      <SubHeading>Please enter Sodaq specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'Sodaq IMEI'}
          name={'sodaqImei'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.sodaqImei.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.sodaqImei)}
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

export default SodaqPane;
