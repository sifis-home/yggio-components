import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {NextRouter} from 'next/router';

import {useLocalState} from '../../../../hooks';
import {
  getFormValues,
  getValidationErrorMessage,
  isFormValid,
} from '../../../../utils/form-wizard';
import ContainerBox from '../../../../components/container-box';
import TextField from '../../../../components/text-field';
import Button from '../../../../components/button';
import {organizationsApi} from '../../../../api';
import {Organization} from '../../../../types';
import {
  Heading,
  ButtonsContainer,
} from './styled';
import formState from './state';

interface CreateOrganizationProps {
  router: NextRouter;
}

const CreateOrganizationPane = (props: CreateOrganizationProps) => {
  const queryClient = useQueryClient();
  const createOrganizationMutation = organizationsApi.useCreateOrganization(queryClient);
  const form = useLocalState(formState);

  const createOrganization = async () => {
    if (isFormValid(form.formInputs)) {
      const template = getFormValues(form.formInputs) as unknown as Organization;
      await createOrganizationMutation.mutateAsync(template);
      await props.router.push('/organizations');
    }
  };

  return (
    <ContainerBox margin="20px">
      <Heading>Create organization</Heading>
      <TextField
        label='Name'
        name='name'
        onChange={evt => {
          form.setInputValue('name', evt.target.value);
        }}
        value={form.formInputs.name.value as string}
        validationErrorMessage={getValidationErrorMessage(form.formInputs.name)}
        margin="0 0 10px 0"
      />
      <TextField
        label='Description'
        name='description'
        value={form.formInputs.description.value as string}
        onChange={evt => {
          form.setInputValue('description', evt.target.value);
        }}
        isOptional
      />
      <ButtonsContainer>
        <Button
          onClick={createOrganization}
          content={'Create'}
          color="green"
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={async () => await props.router.push('/organizations')}
        />
      </ButtonsContainer>
    </ContainerBox>
  );
};

export default CreateOrganizationPane;
