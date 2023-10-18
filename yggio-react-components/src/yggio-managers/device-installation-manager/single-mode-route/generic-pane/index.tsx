import React from 'react';

import {getValidationErrorMessage} from '../../../../utils/form-wizard';
import {onContinue} from './events';
import {onInputChange} from '../events';
import {Form} from '../../../../types';

import Button from '../../../../components/button';
import TextField from '../../../../components/text-field';
import {
  Heading,
  SubHeading,
  ContentContainer,
  NavButtonsContainer,
} from '../../styled';
import {StyledContainerBox} from '../../sub-components';

interface GenericPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}

const GenericPane = (props: GenericPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Generic info</Heading>
      <SubHeading>Please enter Generic specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'Secret'}
          value={props.form.formInputs.secret.value as string}
          onChange={evt => onInputChange(props.form, evt)}
          name={'secret'}
          fullHeight
          margin={'0 0 10px 0'}
          additionalInfo={'A unique identifier'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.secret)}
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
          onClick={() => (
            onContinue(
              props.form.formInputs,
              props.form.showAllInputValidations,
              props.incrementCurrentStep,
            )
          )}
        />
      </NavButtonsContainer>
    </StyledContainerBox>
  );
};

export default GenericPane;
