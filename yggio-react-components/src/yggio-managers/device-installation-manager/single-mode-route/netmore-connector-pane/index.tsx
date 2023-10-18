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


interface NetmoreConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const NetmoreConnectorPane = (props: NetmoreConnectorPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Netmore Connector info</Heading>
      <SubHeading>Please enter Netmore Connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'Netmore URL'}
          name={'url'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.url.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.url)}
          maxLength={64}
        />
        <TextField
          label={'Service Provider'}
          name={'serviceProvider'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.serviceProvider.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.serviceProvider)}
          maxLength={64}
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
          label={'Customer'}
          name={'customerCode'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.customerCode.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.customerCode)}
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

export default NetmoreConnectorPane;
