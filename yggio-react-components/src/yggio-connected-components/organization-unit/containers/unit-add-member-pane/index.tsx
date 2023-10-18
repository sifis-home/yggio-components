/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';

import {ORGANIZATION_ACCESS_TYPES} from '../../../../constants';
import {organizationUtils} from '../../../../utils';
import {
  Wrapper,
  NoMembersNote,
} from './styled';
import {
  MemberRow,
} from './sub-components';
import {organizationsApi, usersApi} from '../../../../api';
import Button from '../../../../components/button';
import {OrganizationUnit} from '../../../../types';

interface UnitAddMemberPane {
  orgId: string;
  unitId: string;
  router: NextRouter;
}

const UnitAddMemberPane = (props: UnitAddMemberPane) => {
  const queryClient = useQueryClient();
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const memberIds = organizationQuery.data?.members;
  const usersQuery = usersApi.useSeekUsersQuery(memberIds);
  const useAssignDeviceAccessMutation = organizationsApi.useAssignDeviceAccess(queryClient);

  const unit = organizationUtils.findUnit(organizationQuery.data, props.unitId) as OrganizationUnit;
  const members = _.compact(_.map(memberIds, member => {
    const users = _.keyBy(usersQuery.data, '_id');
    return users[member as keyof typeof users];
  }));
  const tokens = organizationQuery.data?.accessTokens;
  const unitTokens = _.filter(tokens, token => token.unitId === props.unitId);
  const tokenIds = _.uniq(_.map(unitTokens, token => token.memberId));
  const filteredMembers = _.filter(members, member => !_.includes(tokenIds, member._id));
  // To be used in the future?
  // const admins = _.filter(tokens, {accessType: ORGANIZATION_ACCESS_TYPES.MANAGE_ACCESS});
  // const emplacements = _.filter(tokens, {accessType: ORGANIZATION_ACCESS_TYPES.EMPLACEMENT});

  const onSelected = async (memberId: string) => {
    const data = {
      orgId: props.orgId,
      memberId,
      unitId: props.unitId,
      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_READ,
    };
    await useAssignDeviceAccessMutation.mutateAsync(data);
    await props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/members`);
  };

  return (
    <Wrapper>
      <h1>
        {`Add members to: ${_.get(unit, 'name', '(no name)')}`}
      </h1>
      {_.isEmpty(filteredMembers) &&
      <NoMembersNote>{'No members available'}</NoMembersNote>}
      {_.map(filteredMembers, member => (
        <MemberRow
          key={member._id}
          member={member}
          onSelected={onSelected}
        />
      ))}
      <Button
        content={'Done'}
        onClick={async () => props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/members`)}
        margin={'20px 0 0 0'}
      />
    </Wrapper>
  );
};

export default UnitAddMemberPane;
