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


interface ThingsNetworkConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const ThingsNetworkConnectorPane = (props: ThingsNetworkConnectorPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>The Things Network Connector info</Heading>
      <SubHeading>Please enter The Things Network Connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'The Things Network Host'}
          name={'thingsNetworkHost'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.thingsNetworkHost.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage=
            {getValidationErrorMessage(props.form.formInputs.thingsNetworkHost)}
          maxLength={255}
        />
        <TextField
          label={'Application ID'}
          name={'applicationId'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.applicationId.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.applicationId)}
          maxLength={64}
        />
        <TextField
          label={'API key'}
          name={'apiKey'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.apiKey.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.apiKey)}
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

export default ThingsNetworkConnectorPane;
