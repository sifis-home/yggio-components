/*
 * Copyright 2022 Sensative AB
 * 
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import React from 'react';
import {useQueryClient} from '@tanstack/react-query';
import _ from 'lodash';
import Icon from 'react-icons-kit';
import {check} from 'react-icons-kit/fa/check';
import {close} from 'react-icons-kit/fa/close';

import {
  AccessRightHeader,
  AccessRightsCol,
  AccessRightsRow,
  AccessRightsTable,
  AccessRightsWrapper,
  NoDataBox,
  AccessRightsUsernameSpinner,
  AccessRightsFoundNote,
  AccessRightsNotFoundNote,
} from '../styled';
import TextField from '../../../components/text-field';
import {FlexWrapper, HorizontalLine} from '../../../global/styled';
import {RIGHT_TYPES} from '../constants';
import Button from '../../../components/button';
import Spinner from '../../../components/spinner';
import Chip from '../../../components/chip';
import InfoBox from '../../../components/info-box';
import {
  accessRightsApi,
  usersApi,
  getUserId,
} from '../../../api';
import {
  selectAccessRights,
  selectAccessRightsUserIds,
  selectAccessRightsUsers,
} from '../selectors';
import {useLocalState} from '../../../hooks';
import {accessRightsState} from '../state';
import {AccessRight, Device, Scope, Translate} from '../../../types';

interface Props {
  device: Device;
  t: Translate;
}

const BaseAccessRights = (props: Props) => {

  const queryClient = useQueryClient();

  const accessRightsQuery = accessRightsApi.useAccessRightsResourceQuery({
    deviceId: props.device._id,
  });
  const createAccessRightMutation = accessRightsApi.useCreateAccessRight(queryClient);
  const removeAccessRightMutation = accessRightsApi.useRemoveAccessRight(queryClient);

  const userId = getUserId();
  const accessRightsItems = selectAccessRights({
    userId,
    accessRights: accessRightsQuery.data,
  });
  const accessUserIds = selectAccessRightsUserIds({
    userId,
    accessRights: accessRightsQuery.data,
  });

  const soughtUsersQuery = usersApi.useSeekUsersQuery(accessUserIds);
  const accessRightsUsers = selectAccessRightsUsers({
    userId,
    accessRights: accessRightsQuery.data,
    users: soughtUsersQuery.data,
    device: props.device,
  });

  const accessRightsForm = useLocalState(accessRightsState);
  const userQuery = usersApi.useGetUser({
    username: accessRightsForm.formInputs.username.value as string,
  });

  const handleNewAccessRightUser = (accessRight: Omit<AccessRight, 'subjectType'>) => {
    const template = {
      ...accessRight,
      subjectType: 'singleton'
    };
    createAccessRightMutation.mutate({deviceId: props.device._id, template});
  };

  const handleAccessRight = (
    acr: Omit<AccessRight, 'subjectType' | 'scope'> & {scope: {[K in Scope]: boolean}},
    right: Scope,
  ) => {
    if (_.get(acr, `scope.${right}`)) {
      const template = {
        deviceId: props.device._id,
        scope: [right],
        userId: acr.userId,
        subjectType: 'singleton'
      };
      removeAccessRightMutation.mutate(template);
    } else {
      const template = {
        userId: acr.userId,
        scope: [right],
        subjectType: 'singleton'
      };
      createAccessRightMutation.mutate({deviceId: props.device._id, template});
    }
  };

  if (!accessRightsItems?.scope) {
    return <NoDataBox>{props.t('phrases.noAccessRightsAvailable')}</NoDataBox>;
  }

  return (
    <AccessRightsWrapper>
      <AccessRightHeader>Your access rights to this device:</AccessRightHeader>
      <FlexWrapper>
        {_.map(accessRightsItems?.scope, right => {
          return (
            <Chip key={right} text={right} margin={'0 5px 0 0'} color={'blue'} />
          );
        })}
      </FlexWrapper>
      {/* @ts-ignore - TODO: styled need typing */}
      <HorizontalLine margin={'20px 0'} />
      <AccessRightHeader>Other users access rights to this device:</AccessRightHeader>
      <FlexWrapper>
        <TextField
          width={'350px'}
          name={'username'}
          placeholder={'Enter the username you wish to give access rights to'}
          value={accessRightsForm.formInputs.username.value as string}
          onChange={(evt: React.ChangeEvent<HTMLInputElement>) => accessRightsForm.setInputValue('username', evt.target.value)}
        />
        <FlexWrapper>
          {userQuery.isFetching && (
            <AccessRightsUsernameSpinner>
              <Spinner />
            </AccessRightsUsernameSpinner>
          )}
          {(userQuery.isSuccess || userQuery.isLoading) && (
            <Button
              disabled={userQuery.isSuccess}
              margin={'0 0 0 5px'}
              width={'80px'}
              content={'Add'}
              color={'green'}
              onClick={() => {
                const user = userQuery.data;
                if (user) {
                  handleNewAccessRightUser({
                    userId: user._id,
                    scope: [RIGHT_TYPES.read]
                  });
                  accessRightsForm.resetForm();
                }
              }}
            />
          )}
        </FlexWrapper>
      </FlexWrapper>
      {userQuery.isSuccess && (
        <AccessRightsFoundNote>User found</AccessRightsFoundNote>
      )}
      {userQuery.isError && (
        <AccessRightsNotFoundNote>No user found</AccessRightsNotFoundNote>
      )}
      {createAccessRightMutation.isError && (
        <InfoBox
          heading={`Could not add user: ${_.get(createAccessRightMutation, 'error.message')}`}
          content={_.get(createAccessRightMutation, 'error.response.data') as string}
          type={'error'}
          margin={'20px 0 0 0'}
        />
      )}
      {removeAccessRightMutation.isError && (
        <InfoBox
          heading={`Could not add user: ${_.get(removeAccessRightMutation, 'error.message')}`}
          content={_.get(removeAccessRightMutation, 'error.response.data') as string}
          type={'error'}
          margin={'20px 0 0 0'}
        />
      )}
      {_.isEmpty(accessRightsUsers) && (
        <NoDataBox>No other users have access to this device</NoDataBox>
      )}
      {!_.isEmpty(accessRightsUsers) && (
        <AccessRightsTable>
          <AccessRightsRow>
            <AccessRightsCol>{_.capitalize(props.t('common.user'))}</AccessRightsCol>
            <AccessRightsCol>{props.t('labels.admin')}</AccessRightsCol>
            <AccessRightsCol>{props.t('labels.write')}</AccessRightsCol>
            <AccessRightsCol>{props.t('labels.read')}</AccessRightsCol>
            <AccessRightsCol>{props.t('labels.peek')}</AccessRightsCol>
          </AccessRightsRow>

          {_.map(accessRightsUsers, (
            acr: Omit<AccessRight, 'scope'> & {scope: {[K in Scope]: boolean}}
          ) => {
            return (
              <AccessRightsRow key={acr.userId}>
                <AccessRightsCol>{acr.name}</AccessRightsCol>
                {_.map(acr.scope, (right, key: Scope) => {
                  return (
                    <AccessRightsCol
                      // @ts-ignore - TODO: styled need typing
                      clickable
                      onClick={() => {
                        handleAccessRight(acr, key);
                      }}
                      right={right}
                      key={key}
                    >
                      <Icon icon={right ? check as object : close as object} />
                    </AccessRightsCol>
                  );
                })}
              </AccessRightsRow>
            );
          })}
        </AccessRightsTable>
      )}
    </AccessRightsWrapper>
  );
};

export default BaseAccessRights;
