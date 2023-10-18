import _ from 'lodash';
import {NextRouter} from 'next/router';
import React from 'react';
import {Flex} from '@chakra-ui/react';

import {Users} from '../../../../types';
import {
  MembersListContainer,
} from './styled';
import {MemberItem} from './sub-components';
import {ORGANIZATION_ACCESS_TYPES} from '../../../../constants';
import Button from '../../../../components/button';
import Spinner from '../../../../components/spinner';
import {organizationsApi, usersApi, userApi} from '../../../../api';

interface OrganizationMembersProps {
  router: NextRouter;
  orgId: string;
}

const OrganizationMembersPane = (props: OrganizationMembersProps) => {
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const memberIds = organizationQuery.data?.members;
  const usersQuery = usersApi.useSeekUsersQuery(memberIds);
  const userQuery = userApi.useTokenUser();
  const members = usersQuery.data;

  const isAnyUnitManager = () => {
    const userId = _.get(userQuery.data, '_id');
    const ownerId = _.get(organizationQuery.data, 'ownerId');
    const tokens = _.get(organizationQuery.data, 'accessTokens');
    const unitManagerTokens = _.find(tokens, {
      memberId: userId,
      accessType: ORGANIZATION_ACCESS_TYPES.MANAGE_ACCESS,
    });
    const isOwner = userId === ownerId;
    return _.size(unitManagerTokens) > 0 || isOwner;
  };


  return (
    <MembersListContainer>
      <h1>All members in the organization</h1>

      <MembersList
        members={members}
        isLoading={_.some([
          userQuery.isLoading && userQuery.fetchStatus !== 'idle',
          usersQuery.isLoading && usersQuery.fetchStatus !== 'idle',
          organizationQuery.isLoading && organizationQuery.fetchStatus !== 'idle',
        ])}
      />

      {isAnyUnitManager() && (
        <Button
          margin='10px'
          width='160px'
          content={'Create new member'}
          color={'green'}
          onClick={async () => await props.router.push(`/organizations/${props.orgId}/createMember`)}
        />
      )}

    </MembersListContainer>
  );
};

interface MembersListProps {
  members?: Users;
  isLoading: boolean;
}

const MembersList = (props: MembersListProps) => {
  if (props.isLoading) {
    return (
      <Flex
        w='40px'
        h='40px'
        justifyContent='center'
        alignItems='center'
      >
        <Spinner size={20} />
      </Flex>
    );
  }

  if (!props.members) {
    return (
      <p>There are currently no members in this organization</p>
    );
  }

  return (
    <>
      {_.map(props.members, (member, index) => (
        <MemberItem
          key={member._id}
          member={member}
          index={index}
        />
      ))}
    </>
  );
};

export default OrganizationMembersPane;
