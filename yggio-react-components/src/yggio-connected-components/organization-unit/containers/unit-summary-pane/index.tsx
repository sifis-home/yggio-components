import _ from 'lodash';
import React from 'react';
import {confirmAlert} from 'react-confirm-alert';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';

import {organizationUtils} from '../../../../utils';
import {
  Wrapper,
  Heading,
  UnitName,
  UnitDescription,
  NoUnitDescription,
  ButtonsContainer,
} from './styled';
import {organizationsApi} from '../../../../api';
import Button from '../../../../components/button';

interface UnitSummaryProps {
  unitId: string;
  orgId: string;
  router: NextRouter;
}

const UnitSummaryPane = (props: UnitSummaryProps) => {
  const queryClient = useQueryClient();

  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const deleteUnitMutation = organizationsApi.useDeleteOrganizationUnit(queryClient);

  const unit = organizationUtils.findUnit(organizationQuery.data, props.unitId);
  const isRootUnit = props.unitId && props.unitId === organizationQuery.data?.rootUnit?._id;

  return (
    <Wrapper>

      <Heading>
        {'Name:'}
      </Heading>
      <UnitName>
        {_.get(unit, 'name') || '(no name)'}
      </UnitName>
      <Heading>
        {'Description:'}
      </Heading>

      {!!_.get(unit, 'description') && (
        <UnitDescription>
          {unit?.description}
        </UnitDescription>
      )}
      {!_.get(unit, 'description') && (
        <NoUnitDescription>
          {'No description'}
        </NoUnitDescription>
      )}

      <ButtonsContainer>
        <Button
          color='green'
          content={'Edit'}
          onClick={async () => {
            await props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/edit`);
          }}
        />
        {!isRootUnit && (
          <Button
            onClick={() => {
              const buttons = [
                {
                  label: 'Yes',
                  onClick: async () => {
                    await deleteUnitMutation.mutateAsync({
                      orgId: props.orgId,
                      unitId: props.unitId,
                    });
                    await props.router.push(`/organizations/${props.orgId}/summary`);
                  }
                },
                {
                  label: 'No',
                  // eslint-disable-next-line
                  onClick: () => {},
                }
              ];
              confirmAlert({
                title: 'Remove organization?',
                message: `Are you sure you want the remove organization subunit
                  : "${_.get(unit, 'name', 'Organization not found')}"?`,
                buttons,
              });
            }}
            content={'Delete'}
            color="red"
            margin="0 0 0 10px"
          />
        )}
      </ButtonsContainer>

    </Wrapper>
  );
};

export default UnitSummaryPane;
