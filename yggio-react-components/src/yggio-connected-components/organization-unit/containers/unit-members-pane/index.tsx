import _ from 'lodash';
import React from 'react';
import {NextRouter} from 'next/router';
import {useQueryClient} from '@tanstack/react-query';

import {ORGANIZATION_ACCESS_TYPES} from '../../../../constants';
import {Wrapper} from './styled';
import {organizationsApi, usersApi} from '../../../../api';
import RadioButton from '../../../../components/radio-button';
import Button from '../../../../components/button';

import {
  HeaderCell,
  BodyCell,
} from './sub-components';

interface UnitMembersProps {
  router: NextRouter;
  orgId: string;
  unitId: string;
}

interface MemberItem {
  _id: string;
  username: string;
  hasManagerToken: boolean;
  hasDeviceReadToken: boolean;
  hasDeviceWriteToken: boolean;
  hasDeviceAdminToken: boolean;
  hasEmplacementToken: boolean;
}

const UnitMembersPane = (props: UnitMembersProps) => {
  const queryClient = useQueryClient();
  const organizationQuery = organizationsApi.useOrganizationQuery(props.orgId);
  const moveMemberMutation = organizationsApi.useMoveOrganizationMember(queryClient);
  const assignDeviceAccessMutation = organizationsApi.useAssignDeviceAccess(queryClient);
  const assignManagerAccessMutation = organizationsApi.useAssignManagerAccess(queryClient);
  const revokeDeviceAccessMutation = organizationsApi.useRevokeDeviceAccess(queryClient);
  const revokeManagerAccessMutation = organizationsApi.useRevokeManagerAccess(queryClient);

  const memberIds = organizationQuery.data?.members;
  const tokens = organizationQuery.data?.accessTokens;
  const usersQuery = usersApi.useSeekUsersQuery(memberIds);
  const members = _.compact(_.map(memberIds, member => {
    const users = _.keyBy(usersQuery.data, '_id');
    return users[member as keyof typeof users];
  }));
  const unitTokens = _.filter(tokens, token => token.unitId === props.unitId);
  const unitMemberIds = _.uniq(_.map(unitTokens, token => token.memberId));
  const unitMembers = _.filter(members, member => _.includes(unitMemberIds, member._id)) as unknown as MemberItem[];
  const memberItems = _.map(unitMembers, member => {
    const memberTokens = _.filter(unitTokens, token => token.memberId === member._id);
    const managerToken = _.find(
      memberTokens,
      {accessType: ORGANIZATION_ACCESS_TYPES.MANAGE_ACCESS}
    );
    const devicesReadToken = _.find(
      memberTokens,
      {accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_READ}
    );
    const devicesWriteToken = _.find(
      memberTokens,
      {accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_WRITE}
    );
    const devicesAdminToken = _.find(
      memberTokens,
      {accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_PEEK}
    );
    const emplacementToken = _.find(memberTokens, {accessType: ORGANIZATION_ACCESS_TYPES.EMPLACEMENT});
    const item: MemberItem = {
      _id: member._id,
      username: member.username,
      hasManagerToken: !!managerToken,
      hasDeviceReadToken: !!devicesReadToken,
      hasDeviceWriteToken: !!devicesWriteToken,
      hasDeviceAdminToken: !!devicesAdminToken,
      hasEmplacementToken: !!emplacementToken,
    };
    return item;
  });
  return (
    <Wrapper>
      {!_.isEmpty(memberItems) &&
      <table style={{
        width: '100% - 20px',
        marginBottom: 30,
      }}
      >
        <thead>
          <tr>
            <HeaderCell>{'Member'}</HeaderCell>
            <HeaderCell>{'Manage'}</HeaderCell>
            <HeaderCell>{'Device write'}</HeaderCell>
            <HeaderCell>{'Device read'}</HeaderCell>
            <HeaderCell>{'Device peek'}</HeaderCell>
            <HeaderCell>{'Emplace'}</HeaderCell>
          </tr>
        </thead>

        <tbody>
          {_.map(memberItems, item => (
            <tr key={item._id}>
              <BodyCell>{item.username}</BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasManagerToken}
                  onClick={async () => {
                    const func = item.hasManagerToken
                      ? revokeManagerAccessMutation.mutateAsync
                      : assignManagerAccessMutation.mutateAsync;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                    };
                    try {
                      await func(arg);
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasDeviceWriteToken}
                  onClick={async () => {
                    const func = item.hasDeviceWriteToken
                      ? revokeDeviceAccessMutation.mutateAsync
                      : assignDeviceAccessMutation.mutateAsync;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_WRITE,
                    };
                    try {
                      await func(arg);
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasDeviceReadToken}
                  onClick={async () => {
                    const func = item.hasDeviceReadToken
                      ? revokeDeviceAccessMutation.mutateAsync
                      : assignDeviceAccessMutation.mutateAsync;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_READ,
                    };
                    try {
                      await func(arg);
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasDeviceAdminToken}
                  onClick={async () => {
                    const func = item.hasDeviceAdminToken
                      ? revokeDeviceAccessMutation.mutateAsync
                      : assignDeviceAccessMutation.mutateAsync;
                    const arg = {
                      orgId: props.orgId,
                      unitId: props.unitId,
                      memberId: item._id,
                      accessType: ORGANIZATION_ACCESS_TYPES.DEVICES_PEEK,
                    };
                    try {
                      await func(arg);
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>

              <BodyCell>
                <RadioButton
                  isSelected={item.hasEmplacementToken}
                  onClick={async () => {
                    const arg = {
                      orgId: props.orgId,
                      unitId: (item.hasEmplacementToken ? '' : props.unitId),
                      memberId: item._id,
                    };
                    try {
                      await moveMemberMutation.mutateAsync(arg);
                    } catch (err) {
                      // do nothing?
                    }
                  }}
                />
              </BodyCell>
            </tr>
          ))}
        </tbody>
      </table>}
      <Button
        width='160px'
        color='green'
        label={'Add members to unit'}
        onClick={async () => (
          props.router.push(`/organizations/${props.orgId}/units/${props.unitId}/createMember`)
        )}
      />
    </Wrapper>
  );
};

export default UnitMembersPane;
