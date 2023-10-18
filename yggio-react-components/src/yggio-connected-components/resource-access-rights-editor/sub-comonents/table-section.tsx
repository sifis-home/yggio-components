/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import _ from 'lodash';
import {toast} from 'react-hot-toast';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {
  MdCheck as CheckIcon,
  MdClose as CrossIcon,
} from 'react-icons/md';

import {useTranslation} from 'react-i18next';

import {selectAccessRightsUsers} from '../selectors';
import {ScopeItem, ResourceAccessRight, ResourceType} from '../../../types';
import {
  getUserId,
  usersApi,
  accessRightsRequests,
} from '../../../api';
import {AccessRightDeletionParams} from '../../../api/access-rights/types';
import {
  Table,
  HeadingCell,
  NameCell,
  AccessRightCell,
} from '../styled';

interface TableSectionProps {
  resourceId: string;
  resourceType: ResourceType;
  accessUserIds: string[];
  accessRights?: ResourceAccessRight[];
  createAccessRight: (userId: string, scope: ScopeItem[]) => void;
}

const TableSection = (props: TableSectionProps) => {

  const {t} = useTranslation();

  const currentUserId = getUserId();

  const soughtUsersQuery = usersApi.useSeekUsersQuery(props.accessUserIds);

  const accessRightsUsers = selectAccessRightsUsers({
    currentUserId,
    accessRights: props.accessRights,
    users: soughtUsersQuery.data,
  });

  const queryClient = useQueryClient();

  const removeAccessRightMutation = useMutation(
    async (props: AccessRightDeletionParams) => accessRightsRequests.removeAccessRight(props),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['resourceAccessRights']);
        await queryClient.invalidateQueries(['subjectAccessRights']);
      },
      onError: () => {
        toast.error(t('phrases.failedAccessRightRemoval'));
      },
    },
  );

  const handleAccessRight = (
    userId: string,
    right: ScopeItem,
    scopes: Record<ScopeItem, boolean>,
  ) => {
    if (userId === currentUserId) return;
    if (_.get(scopes, right)) {
      const template = {
        resourceId: props.resourceId,
        scope: [right],
        subjectId: userId,
        resourceType: props.resourceType,
        subjectType: 'singleton'
      } as const;
      removeAccessRightMutation.mutate(template);
    } else {
      props.createAccessRight(userId, [right]);
    }
  };

  return (
    <Table>
      <div></div>
      <HeadingCell>Admin</HeadingCell>
      <HeadingCell>Write</HeadingCell>
      <HeadingCell>Read</HeadingCell>
      <HeadingCell>Peek</HeadingCell>
      {_.map(accessRightsUsers, accessRight => (
        <React.Fragment key={accessRight.name}>
          <NameCell>{accessRight.isOwnedByCurrentUser ? 'You' : accessRight.name}</NameCell>
          {_.map(accessRight.scope, (right, key: ScopeItem) => (
            <AccessRightCell
              isActive={right}
              isCurrentUser={accessRight.userId === currentUserId}
              onClick={() => handleAccessRight(accessRight.userId, key, accessRight.scope)}
              key={key}
            >
              {right ? <CheckIcon size={16} /> : <CrossIcon size={16} />}
            </AccessRightCell>
          ))}
        </React.Fragment>
      ))}
    </Table>
  );
};

export default TableSection;
