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


interface ActilityThingparkConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}

const ActilityThingparkConnectorPane = (props: ActilityThingparkConnectorPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Actility Thingpark subscriber credentials</Heading>
      <SubHeading>Please enter Actility Thingpark connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'Actility Thingpark URL'}
          name={'thingparkUrl'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.thingparkUrl.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.thingparkUrl)}
          maxLength={64}
        />
        <TextField
          label={'Target profile identifier'}
          name={'targetProfileIdentifier'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.targetProfileIdentifier.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage=
            {getValidationErrorMessage(props.form.formInputs.targetProfileIdentifier)}
          maxLength={64}
        />
        <TextField
          label={'Login email'}
          name={'loginEmail'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.loginEmail.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.loginEmail)}
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

export default ActilityThingparkConnectorPane;
