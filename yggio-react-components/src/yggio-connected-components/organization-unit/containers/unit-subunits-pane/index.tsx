import _ from 'lodash';
import React from 'react';
import {confirmAlert} from 'react-confirm-alert';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';

import {organizationUtils} from '../../../../utils';
import {
  Wrapper,
  Subunit,
  SubunitName,
  SubunitNumChildren,
} from './styled';
import {organizationsApi} from '../../../../api';
import Button from '../../../../components/button';
import {OrganizationUnit} from '../../../../types';

interface UnitSubunitsProps {
  orgId: string;
  unitId: string;
  router: NextRouter;
}

const UnitSubunitsPane = (props: UnitSubunitsProps) => {
  const queryClient = useQueryClient();

  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const deleteUnitMutation = organizationsApi.useDeleteOrganizationUnit(queryClient);

  const unit = organizationUtils.findUnit(organizationQuery.data, props.unitId) as OrganizationUnit;

  return (
    <Wrapper>
      {_.map(unit?.children, subUnit => (
        <Subunit
          key={subUnit._id}
          onClick={async () => {
            await props.router.push(`/organizations/${props.orgId}/units/${subUnit._id}/summary`);
          }}
        >
          <SubunitName>
            {subUnit.name}
          </SubunitName>
          <SubunitNumChildren>
            {`${_.get(subUnit, 'children.length')} children`}
          </SubunitNumChildren>
          <Button
            width={'70px'}
            height={'30px'}
            color={'red'}
            content={'Delete'}
            onClick={(evt: React.ChangeEvent<HTMLInputElement>) => {
              evt.stopPropagation();
              const buttons = [
                {
                  label: 'Yes',
                  onClick: async () => {
                    await deleteUnitMutation.mutateAsync({
                      orgId: props.orgId,
                      unitId: subUnit._id,
                    });
                    await props.router.push(`/organizations/${props.orgId}/summary`);
                  },
                },
                {
                  label: 'No',
                  // eslint-disable-next-line
                  onClick: () => { }
                }
              ];
              confirmAlert({
                title: 'Remove organization subunit?',
                message: `Are you sure you want the remove organization subunit: "${subUnit.name}"?`,
                buttons,
              });
            }}
          />
        </Subunit>
      ))}
      <Button
        color='green'
        content={'Add subunit'}
        onClick={async () => {
          await props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/addSubunit`);
        }}
        margin={'20px 0 0 0'}
      />
    </Wrapper>
  );
};

export default UnitSubunitsPane;
