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


interface CelsiviewConnectorPaneProps {
  incrementCurrentStep: () => void;
  onBack: () => void;
  form: Form;
}
const CelsiviewConnectorPane = (props: CelsiviewConnectorPaneProps) => {
  return (
    <StyledContainerBox>
      <Heading>Celsiview Connector</Heading>
      <SubHeading>Please enter Celsiview Connector specific information</SubHeading>
      <ContentContainer>
        <TextField
          label={'URL'}
          name={'url'}
          isDisabled={true}
          value={'https://api.celsiview.se/api/v2'}
          margin={'0 0 10px 0'}
        />
        <TextField
          label={'Application Key'}
          name={'appKey'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.appKey.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage=
            {getValidationErrorMessage(props.form.formInputs.appKey)}
          maxLength={64}
        />
        <TextField
          label={'Client Key'}
          name={'clientKey'}
          onChange={evt => onInputChange(props.form, evt)}
          value={props.form.formInputs.clientKey.value as string}
          margin={'0 0 10px 0'}
          validationErrorMessage={getValidationErrorMessage(props.form.formInputs.clientKey)}
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

export default CelsiviewConnectorPane;
