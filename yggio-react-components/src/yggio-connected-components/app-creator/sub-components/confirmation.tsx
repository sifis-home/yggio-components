import React from 'react';
import {NextRouter} from 'next/router';
import {
  Flex,
  Text,
} from '@chakra-ui/react';

import {Form} from '../../../types';
import ContainerBox from '../../../components/container-box';
import Button from '../../../components/button';

interface ConfirmationProps {
  router: NextRouter;
  form: Form;
  handleAppCreation: () => void;
  incrementCurrentStep: () => void;
  decrementCurrentStep: () => void;
}

const Confirmation = (props: ConfirmationProps) => (
  <ContainerBox margin='10px 0 0'>
    <Text
      m='20px'
      h='60px'
      fontSize='sm'
    >
      You are about to create an application, press Create to confirm.
    </Text>
    <Flex justifyContent='space-between'>
      <Button
        label='Back'
        ghosted
        onClick={props.decrementCurrentStep}
        width='200px'
        margin='10px'
      />
      <Button
        label='Create'
        color='green'
        onClick={props.handleAppCreation}
        width='200px'
        margin='10px'
      />
    </Flex>
  </ContainerBox>
);

export default Confirmation;
