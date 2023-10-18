/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import {NextRouter} from 'next/router';

import {
  Wrapper,
  ButtonsContainer,
} from './styled';
import formState from './state';

import {useLocalState} from '../../../../hooks';
import {organizationUtils} from '../../../../utils';
import TextField from '../../../../components/text-field';
import Button from '../../../../components/button';
import {organizationsApi} from '../../../../api';
import {OrganizationUnit} from '../../../../types';

interface EditUnitProps {
  unitId: string;
  orgId: string;
  router: NextRouter;
}

const EditUnitPane = (props: EditUnitProps) => {
  const queryClient = useQueryClient();
  const updateOrganizationUnitMutation = organizationsApi.useUpdateOrganizationUnit(queryClient);
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const organizationUnitForm = useLocalState(formState);

  React.useEffect(() => {
    if (organizationQuery.data?.name && organizationQuery.data?.description) {
      const unit = organizationUtils.findUnit(organizationQuery.data, props.unitId) as OrganizationUnit;
      organizationUnitForm.setInputValue('name', unit?.name);
      organizationUnitForm.setInputValue(
        'description',
        unit?.description,
      );
    }
  }, []);

  const saveEdits = async () => {
    const template = {
      name: organizationUnitForm.formInputs.name.value as string,
      description: organizationUnitForm.formInputs.description.value as string,
    };
    await updateOrganizationUnitMutation.mutateAsync({
      orgId: props.orgId,
      unitId: props.unitId,
      template
    });
    await props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/summary`);
  };

  return (
    <Wrapper>
      <h1>Edit unit</h1>
      <TextField
        label='Name'
        name='name'
        onChange={evt => {
          organizationUnitForm.setInputValue('name', evt.target.value);
        }}
        value={organizationUnitForm.formInputs.name.value as string}
        margin="0 0 10px 0"
      />
      <TextField
        label='Description'
        name='description'
        onChange={evt => {
          organizationUnitForm.setInputValue('description', evt.target.value);
        }}
        value={organizationUnitForm.formInputs.description.value as string}
        isOptional
      />
      <ButtonsContainer>
        <Button
          onClick={saveEdits}
          content='Save'
          color="green"
          margin="0 10px 0 0"
        />
        <Button
          content='Cancel'
          onClick={async () => {
            await props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/summary`);
          }}
        />
      </ButtonsContainer>
    </Wrapper>
  );
};

export default EditUnitPane;
