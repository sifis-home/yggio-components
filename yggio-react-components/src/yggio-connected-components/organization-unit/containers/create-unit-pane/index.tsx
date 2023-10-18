/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';

import formState from './state';
import {useLocalState} from '../../../../hooks';

import {
  Wrapper,
  ButtonsContainer,
} from './styled';

import TextField from '../../../../components/text-field';
import Button from '../../../../components/button';
import {organizationsApi} from '../../../../api';

interface CreateUnitPaneProps {
  router: NextRouter;
  orgId: string;
  unitId: string;
}

const CreateUnitPane = (props: CreateUnitPaneProps) => {
  const queryClient = useQueryClient();
  const createOrganizationUnitMutation = organizationsApi.useCreateOrganizationUnit(queryClient);
  const organizationForm = useLocalState(formState);

  const createUnit = async () => {
    const template = {
      name: organizationForm.formInputs.name.value as string,
      description: organizationForm.formInputs.description.value as string,
    };
    await createOrganizationUnitMutation.mutateAsync({
      orgId: props.orgId,
      parentUnitId: props.unitId,
      template,
    });
    await props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/summary`);
  };

  return (
    <Wrapper>
      <h1>{'Create subunit'}</h1>
      <TextField
        label="Name"
        name="name"
        onChange={evt => {
          void organizationForm.setInputValue('name', evt.target.value);
        }}
        value={organizationForm.formInputs.name.value as string}
        margin="0 0 10px 0"
      />
      <TextField
        label="Description"
        name="description"
        onChange={evt => {
          void organizationForm.setInputValue('description', evt.target.value);
        }}
        isOptional
        value={organizationForm.formInputs.description.value as string}
      />
      <ButtonsContainer>
        <Button
          onClick={createUnit}
          content={'Create'}
          color="green"
          margin="0 10px 0 0"
        />
        <Button
          content={'Cancel'}
          onClick={async () => {
            await props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/summary`);
          }}
        />
      </ButtonsContainer>
    </Wrapper>
  );
};

export default CreateUnitPane;
