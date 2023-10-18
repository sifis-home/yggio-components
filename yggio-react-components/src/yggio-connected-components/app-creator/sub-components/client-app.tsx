import React from 'react';
import {NextRouter} from 'next/router';
import {
  Flex,
} from '@chakra-ui/react';

import {getValidationErrorMessage} from '../../../utils/form-wizard';
import {Form} from '../../../types';
import {HorizontalLine} from '../../../global/styled';
import ContainerBox from '../../../components/container-box';
import TextField from '../../../components/text-field';
import Button from '../../../components/button';

interface ClientAppProps {
  router: NextRouter;
  form: Form;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;
}

const ClientApp = (props: ClientAppProps) => (
  <ContainerBox margin='10px 0 0'>
    <TextField
      label='URL'
      additionalInfo={'Your applications redirect URL'}
      placeholder='URL'
      ariaLabel='URL'
      width='300px'
      value={props.form.formInputs.URL.value as string}
      onChange={evt => {
        props.form.setInputValue('URL', evt.target.value);
      }}
      margin='10px'
      isRequired
      validationErrorMessage={
        props.form.formInputs.URL.value
          ? getValidationErrorMessage(props.form.formInputs.URL)
          : null
      }
    />

    {/* @ts-ignore - untyped styled component */}
    <HorizontalLine margin='30px 0 30px' />
    <Flex justifyContent='space-between'>
      <Button
        label='Back'
        ghosted
        onClick={props.decrementCurrentStep}
        width='200px'
        margin='10px'
      />
      <Button
        disabled={!props.form.formInputs.URL.validation.isValid}
        label='Continue'
        color='green'
        onClick={props.incrementCurrentStep}
        width='200px'
        margin='10px'
      />
    </Flex>
  </ContainerBox>
);

export default ClientApp;
