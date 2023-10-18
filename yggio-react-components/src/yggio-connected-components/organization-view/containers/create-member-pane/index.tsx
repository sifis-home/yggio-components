/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import {useQueryClient} from '@tanstack/react-query';
import {NextRouter} from 'next/router';
import React from 'react';
import {
  getFormValues,
  getValidationErrorMessage,
  isFormValid,
} from '../../../../utils/form-wizard';

import {useLocalState} from '../../../../hooks';
import Button from '../../../../components/button';
import TextField from '../../../../components/text-field';
import formState from './state';
import {organizationsApi} from '../../../../api';
import {OrganizationUnit} from '../../../../types';

import {
  CreateOrganizationWrapper,
  ButtonsContainer,
} from './styled';

interface CreateMemberProps {
  orgId: string;
  router: NextRouter;
}

const CreateMemberPane = (props: CreateMemberProps) => {
  const queryClient = useQueryClient();
  const createMemberMutation = organizationsApi.useCreateOrganizationMember(queryClient);
  const form = useLocalState(formState);

  const createMember = async () => {
    if (isFormValid(form.formInputs)) {
      const rawTemplate = getFormValues(form.formInputs);
      // exlude email if length 0 string
      const updates = (rawTemplate.email
        ? rawTemplate
        : _.omit(rawTemplate, 'email')) as Pick<OrganizationUnit, 'name' | 'description'>;
      await createMemberMutation.mutateAsync({
        orgId: props.orgId,
        updates,
      });
      await props.router.push(`/organizations/${props.orgId}/summary`);
    }
  };

  return (
    <CreateOrganizationWrapper>
      <h1>Create new member</h1>
      <TextField
        label="Username (*)"
        name="username"
        onChange={evt => {
          form.setInputValue('username', evt.target.value);
        }}
        value={form.formInputs.username.value as string}
        validationErrorMessage={getValidationErrorMessage(form.formInputs.username)}
        margin="0 0 10px 0"
      />
      <TextField
        label="Email"
        name="email"
        onChange={evt => {
          form.setInputValue('email', evt.target.value);
        }}
        value={form.formInputs.email.value as string}
        validationErrorMessage={getValidationErrorMessage(form.formInputs.email)}
        margin="0 0 10px 0"
      />
      <TextField
        isPassword
        label="Password (*)"
        name="password"
        onChange={evt => {
          form.setInputValue('password', evt.target.value);
        }}
        value={form.formInputs.password.value as string}
        validationErrorMessage={getValidationErrorMessage(form.formInputs.password)}
      />
      <ButtonsContainer>
        <Button
          onClick={createMember}
          content={'Create'}
          color="green"
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={async () => props.router.push(`/organizations/${props.orgId}/summary`)}
        />
      </ButtonsContainer>
    </CreateOrganizationWrapper>
  );
};

export default CreateMemberPane;
