/*
 * Copyright 2023 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import React from 'react';
import {useQueryClient, useMutation} from '@tanstack/react-query';
import {toast} from 'react-hot-toast';

import {accessRightsApi, accessRightsRequests} from '../../api';
import {AccessRightCreationTemplate} from '../../api/access-rights/types';
import {selectAccessRightsUserIds} from './selectors';
import {ScopeItem, ResourceType} from '../../types';
import AddUserSection from './sub-comonents/add-user-section';
import TableSection from './sub-comonents/table-section';
import {getRequestErrorMessage} from '../../utils';

interface ResourceAccessRightsEditorProps {
  resourceId: string;
  resourceType: ResourceType;
}

const ResourceAccessRightsEditor = (props: ResourceAccessRightsEditorProps) => {

  const accessRightsQuery = accessRightsApi.useAccessRightsResourceQuery({resourceId: props.resourceId, resourceType: props.resourceType});

  const accessUserIds = selectAccessRightsUserIds({accessRights: accessRightsQuery.data});

  const queryClient = useQueryClient();

  const createAccessRightMutation = useMutation(
    async (props: AccessRightCreationTemplate) => await accessRightsRequests.createAccessRight(props),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(['resourceAccessRights']);
        await queryClient.invalidateQueries(['subjectAccessRights']);
      },
      onError: (error: Error) => {
        toast.error(getRequestErrorMessage(error));
      },
    },
  );

  const createAccessRight = (userId: string, scope: ScopeItem[]) => {
    const template = {
      subjectId: userId,
      scope,
      subjectType: 'singleton',
      resourceType: props.resourceType,
      resourceId: props.resourceId,
    } as const;
    createAccessRightMutation.mutate(template);
  };

  return (
    <>
      <AddUserSection
        accessUserIds={accessUserIds}
        createAccessRight={createAccessRight}
      />
      <TableSection
        resourceId={props.resourceId}
        resourceType={props.resourceType}
        accessUserIds={accessUserIds}
        accessRights={accessRightsQuery.data}
        createAccessRight={createAccessRight}
      />
    </>
  );
};

export default ResourceAccessRightsEditor;
